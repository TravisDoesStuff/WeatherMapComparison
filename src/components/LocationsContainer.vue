<template>
  <div class='locationsContainer'>
    <DataContainer />
    <LocationMap />
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
  min-width: 960px;
  height: 100%;
  margin: 0 auto;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
}
.prompt {
  text-align: center;
  font-weight: bold;
  margin-top: 20px;
}
</style>
