<template>
  <div id="app">
    <div class='appHeader'>Weather Comparison Map</div>
    <LocationsContainer />
    <Attribution />
  </div>
</template>

<script>
import LocationsContainer from './components/LocationsContainer.vue';
import Attribution from './components/Attribution.vue';

export default {
  name: 'app',
  components: {
    LocationsContainer,
    Attribution
  }
}
</script>

<style>
html, body, #app {
  margin: 0;
  font-family: Helvetica, Arial, sans-serif;
  background: azure;
}
.appHeader {
  background: black;
  color: white;
  font-size: 35px;
  font-weight: bold;
  padding: 20px;
  text-align: center;
  word-spacing: 10px;
  letter-spacing: 1px;
  margin-bottom: 20px;
}
</style>
