<template>
  <div class='location'>
    <LocationMap :side='side' />
  </div>
</template>

<script>
import LocationMap from './LocationMap.vue';

export default {
  name: 'Location',
  components: {
    LocationMap
  },
  props: [
    'side'
  ]
}
</script>

<style scoped>
.location {
  width: 100%;
  height: 300px;
}
</style>
