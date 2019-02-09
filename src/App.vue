<template>
  <div id="app">
    <LocationsContainer />
  </div>
</template>

<script>
import LocationsContainer from './components/LocationsContainer.vue'

export default {
  name: 'app',
  components: {
    LocationsContainer
  }
}
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
}
</style>
