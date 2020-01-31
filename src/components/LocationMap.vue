<template>
  <div class='locationMap' v-bind:class='{ expanded: !this.$store.state.homeData.isLoaded && !this.$store.state.awayData.isLoaded }'>
    <l-map :zoom="zoom" :center="center" @click="handleMapClick">
      <l-tile-layer :url="url" :attribution="attribution" class="mapTile"></l-tile-layer>
      <l-marker :lat-lng="homeMarker" @click="handleIconClick()"></l-marker>
      <l-marker :lat-lng="awayMarker" @click="handleIconClick(true)"></l-marker>
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
      awayMarker: L.latLng(0, 0),
      homeLocation: [],
      awayLocation: [],
      weatherData: {},
      isLoading: false
    }
  },
  methods: {
    handleMapClick(e) {
      this.loading = true;
      let newLocation = [e.latlng.lat.toString(), e.latlng.lng.toString()];
      let isAway = false;

      if(this.homeLocation.length === 0) {
        this.homeLocation = newLocation;
        this.homeMarker = L.latLng(newLocation);
      }
      else {
        this.awayLocation = newLocation;
        this.awayMarker = L.latLng(newLocation);
        isAway = true;
      }
      
      this.fetchGeoData(isAway);
      this.fetchWeatherData(isAway);
      this.fetchClimateData(isAway);
      this.fetchElevationData(isAway);
      this.fetchDaylightData(isAway);
    },
    handleIconClick(isAway=false) {
      if(!isAway) {
        this.homeLocation = [];
        this.homeMarker = L.latLng(0, 0);
      }
      else {
        this.awayLocation = [];
        this.awayMarker = L.latLng(0, 0);
      }

      this.clearData(isAway);
    },
    clearData(isAway=false) {
      let clearMethod = 'clearHomeData';
      if(isAway) {
        clearMethod = 'clearAwayData';
      }

      this.$store.commit(clearMethod);
    },
    fetchWeatherData(isAway=false) {
      let setStoreMethod = 'setHomeWeather';
      let urlLocation = this.homeLocation;

      if(isAway) {
        setStoreMethod = 'setAwayWeather';
        urlLocation = this.awayLocation;
      }

      let corsProxy = 'https://cors-anywhere.herokuapp.com/';
      let darkSkyKey = process.env.VUE_APP_DARKSKY_KEY;
      let url = corsProxy+ 'https://api.darksky.net/forecast/'+darkSkyKey+'/'+urlLocation;

      return axios.get(url)
        .then(response => {
          this.$store.commit(setStoreMethod, response.data.currently);
          this.loading = false;
        });
    },
    fetchGeoData(isAway=false) {
      let setStoreMethod = 'setHomeAddress';
      let arcGISlocation = this.homeLocation.slice().reverse();

      if(isAway) {
        setStoreMethod = 'setAwayAddress';
        arcGISlocation = this.awayLocation.slice().reverse();
      }

      let arcGISurl = 'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location='+arcGISlocation;

      return axios.get(arcGISurl)
        .then(response => {
          this.$store.commit(setStoreMethod, response.data.address.City+', '+response.data.address.Region);
        });
    },
    fetchClimateData(isAway=false) {
      let setStoreMethod = 'setHomeClimate';
      let lat = this.homeLocation[0];
      let lon = this.homeLocation[1];

      if(isAway) {
        setStoreMethod = 'setAwayClimate';
        lat = this.awayLocation[0];
        lon = this.awayLocation[1];
      }

      let climateUrl = 'http://climateapi.scottpinkelman.com/api/v1/location/'+lat+'/'+lon;

      return axios.get(climateUrl)
        .then(response => {
          this.$store.commit(setStoreMethod, response.data.return_values[0].zone_description);
        });
    },
    fetchElevationData(isAway=false) {
      let setStoreMethod = 'setHomeElevation';
      let lat = this.homeLocation[0];
      let lon = this.homeLocation[1];

      if(isAway) {
        setStoreMethod = 'setAwayElevation';
        lat = this.awayLocation[0];
        lon = this.awayLocation[1];
      }

      let elevationUrl = 'https://elevation-api.io/api/elevation?points='+lat+','+lon;

      return axios.get(elevationUrl)
        .then(response => {
          this.$store.commit(setStoreMethod, response.data.elevations[0]);
        });
    },
    fetchDaylightData(isAway=false) {
      let setStoreMethod = 'setHomeDaylight';
      let lat = this.homeLocation[0];
      let lon = this.homeLocation[1];

      if(isAway) {
        setStoreMethod = 'setAwayDaylight';
        lat = this.awayLocation[0];
        lon = this.awayLocation[1];
      }

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
  height: 30%;
}
.expanded {
  height: 60%;
}
</style>
