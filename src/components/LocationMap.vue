<template>
  <div class='locationMap'>
    <l-map :zoom="zoom" :center="center" @click="handleMapClick">
      <l-tile-layer :url="url" :attribution="attribution" class="mapTile"></l-tile-layer>
      <l-marker :lat-lng="marker"></l-marker>
    </l-map>
    {{ this.weatherData }}
  </div>
</template>

<script>
import {LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import axios from 'axios';

export default {
  name: 'LocationMap',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      zoom: 4,
      center: L.latLng(40, -98),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:' &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(40, -98),
      location,
      weatherData: {},
      isLoading: false
    }
  },
  methods: {
    handleMapClick(e) {
      this.location = [e.latlng.lat.toString(), e.latlng.lng.toString()];
      this.marker = L.latLng(this.location);
      this.loading = true;
      this.fetchWeatherData();
    },
    fetchWeatherData() {
      let corsProxy = 'https://cors-anywhere.herokuapp.com/';
      let darkSkyKey = process.env.VUE_APP_DARKSKY_KEY;
      let url = corsProxy+ 'https://api.darksky.net/forecast/'+darkSkyKey+'/'+this.location;
      
      return axios.get(url)
        .then(response => {
          this.weatherData = response.data.currently,
          this.loading = false
        });
    }
  }
}
</script>

<style scoped>
.locationMap {
  width: 100%;
  height: 25%;
}
</style>
