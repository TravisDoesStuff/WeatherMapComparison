<template>
  <div class='locationMap'>
    <l-map :zoom="zoom" :center="center" @click="handleMapClick">
      <l-tile-layer :url="url" :attribution="attribution" class="mapTile"></l-tile-layer>
      <l-marker :lat-lng="homeMarker" @click="handleIconClick()"></l-marker>
    </l-map>
  </div>
</template>

<script>
import { L, LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import axios from 'axios';

export default {
  name: 'LocationMap',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  props: [
    'side'
  ],
  data() {
    return {
      zoom: 4,
      center: L.latLng(38, -98),
      url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png',
      attribution:' &copy; Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      homeMarker: L.latLng(0, 0),
      homeLocation: [],
      weatherData: {},
      isLoading: false
    }
  },
  methods: {
    handleMapClick(e) {
      this.loading = true;
      let newLocation = [e.latlng.lat.toString(), e.latlng.lng.toString()];

      if(this.homeLocation.length === 0) {
        this.homeLocation = newLocation;
        this.homeMarker = L.latLng(newLocation);
      }
      
      this.fetchGeoData();
      this.fetchWeatherData();
      this.fetchClimateData();
      this.fetchElevationData();
      this.fetchDaylightData();
    },
    handleIconClick() {
      this.homeLocation = [];
      this.homeMarker = L.latLng(0, 0);
    },
    clearData() {
      let clearMethod = 'clearHomeData';

      this.$store.commit(clearMethod);
    },
    fetchWeatherData() {
      let setStoreMethod = 'setHomeWeather';
      let urlLocation = this.homeLocation;

      let latitude = urlLocation[0];
      let longitude = urlLocation[1];

      let openWeatherKey = process.env.VUE_APP_OPENWEATHER_KEY;
      let units = 'imperial';
      let url = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&units='+units+'&appid='+openWeatherKey;

      return axios.get(url)
        .then(response => {
          this.$store.commit(setStoreMethod, response);
          this.loading = false;
        });
    },
    fetchGeoData() {
      let setStoreMethod = 'setHomeAddress';
      let arcGISlocation = this.homeLocation.slice().reverse();

      let arcGISurl = 'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location='+arcGISlocation;

      return axios.get(arcGISurl)
        .then(response => {
          this.$store.commit(setStoreMethod, response.data.address.City+', '+response.data.address.Region);
        });
    },
    fetchClimateData() {
      let setStoreMethod = 'setHomeClimate';
      let lat = this.homeLocation[0];
      let lon = this.homeLocation[1];

      let climateUrl = 'http://climateapi.scottpinkelman.com/api/v1/location/'+lat+'/'+lon;

      return axios.get(climateUrl)
        .then(response => {
          this.$store.commit(setStoreMethod, response.data.return_values[0].zone_description);
        });
    },
    fetchElevationData() {
      let setStoreMethod = 'setHomeElevation';
      let lat = this.homeLocation[0];
      let lon = this.homeLocation[1];

      let elevationUrl = 'https://elevation-api.io/api/elevation?points='+lat+','+lon;

      return axios.get(elevationUrl)
        .then(response => {
          this.$store.commit(setStoreMethod, response.data.elevations[0]);
        });
    },
    fetchDaylightData() {
      let setStoreMethod = 'setHomeDaylight';
      let lat = this.homeLocation[0];
      let lon = this.homeLocation[1];

      let sunUrl = 'https://api.sunrise-sunset.org/json?lat='+lat+'&lng='+lon+'&formatted=0&date=today';

      return axios.get(sunUrl)
        .then(response => {
          this.$store.commit(setStoreMethod, response.data.results);
        });
    }
  }
}
</script>

<style scoped>
.locationMap {
  width: 100%;
  height: 60%;
}
</style>
