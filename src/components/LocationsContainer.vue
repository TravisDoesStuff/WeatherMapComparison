<template>
  <div class='locationsContainer'>
    <LocationMap />
    <DataContainer />
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
  width: 960px;
  height: 700px;
  margin: 0 auto;
  margin-top: 30px;
}
</style>
