<template>
  <div class='locationsContainer'>
    <Location :side='side' />
    <DataContainer :side='side' />
  </div>
</template>

<script>
import Location from './Location.vue';
import DataContainer from './DataContainer.vue';

export default {
  name: 'LocationsContainer',
  components: {
    Location,
    DataContainer,
  },
  props: [
    'side'
  ]
}
</script>

<style scoped>
.locationsContainer {
  width: 50%;
  height: 100%;
}
</style>
