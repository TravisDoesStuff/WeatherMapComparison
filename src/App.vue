<template>
  <div id="app">
    <h1>Weather Comparison Map</h1>
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
  height: 100%;
  margin: 0;
  font-family: Helvetica, Arial, sans-serif;
}
h1 {
  text-align: center;
}
</style>
