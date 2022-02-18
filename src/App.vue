<template>
  <div id="app">
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
  width: 100%;
  height: 100%;
}
</style>
