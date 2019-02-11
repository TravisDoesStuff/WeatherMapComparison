<template>
  <div id="app" class='flex'>
    <LocationsContainer side='home' />
    <DividerContainer />
    <LocationsContainer side='away' />
  </div>
</template>

<script>
import LocationsContainer from './components/LocationsContainer.vue';
import DividerContainer from './components/DividerContainer.vue';

export default {
  name: 'app',
  components: {
    LocationsContainer,
    DividerContainer
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
