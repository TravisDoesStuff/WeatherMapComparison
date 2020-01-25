<template>
  <div id="app">
    <div class='appHeader'>Cloud2Ground</div>
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
  background: floralwhite;
}
.appHeader {
  background: black;
  color: white;
  font-size: 26px;
  font-weight: bold;
  padding: 10px;
  text-align: center;
  letter-spacing: 1px;
}
</style>
