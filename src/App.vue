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
  height: 100%;
  margin: 0;
}
</style>
