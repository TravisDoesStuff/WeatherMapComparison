<template>
  <div class='locationMap'>
    <l-map :zoom="zoom" :center="center" @click="handleMapClick">
      <l-tile-layer :url="url" :attribution="attribution" class="mapTile"></l-tile-layer>
      <l-marker :lat-lng="homeMarker"></l-marker>
      <l-marker :lat-lng="awayMarker"></l-marker>
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
      center: L.latLng(40, -98),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:' &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
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
      // this.fetchSunData();
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
          console.log(response.data);
          this.$store.commit(setStoreMethod, response.data.return_values[0].zone_description);
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
</style>
