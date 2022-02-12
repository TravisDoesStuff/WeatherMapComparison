<template>
  <div class='locationsContainer'>
    <LocationMap />
    <DataContainer v-if='this.$store.state.homeData.isLoaded' />
    <div v-else class='prompt'>Click on a location to get started.</div>
  </div>
</template>

<script>
import LocationMap from './LocationMap.vue';
import DataContainer from './DataContainer.vue';

export default {
  name: 'LocationsContainer',
  components: {
    LocationMap,
    DataContainer,
  },
  props: [
    'side'
  ]
}
</script>

<style scoped>
.locationsContainer {
  max-width: 960px;
  height: 700px;
  margin: 0 auto;
  overflow-x: hidden;
}
.prompt {
  text-align: center;
  font-weight: bold;
  margin-top: 20px;
}
</style>
