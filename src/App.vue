<template>
  <div id="app">
    <div class='flex'>
      <LocationsContainer side='home' />
      <DividerContainer />
      <LocationsContainer side='away' />
    </div>
    <Attribution />
  </div>
</template>

<script>
import LocationsContainer from './components/LocationsContainer.vue';
import DividerContainer from './components/DividerContainer.vue';
import Attribution from './components/Attribution.vue';

export default {
  name: 'app',
  components: {
    LocationsContainer,
    DividerContainer,
    Attribution
  }
}
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
}
.flex {
  display: flex;
}
</style>
