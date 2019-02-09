<template>
  <div class='location'>
    <LocationMap />
  </div>
</template>

<script>
import LocationMap from './LocationMap.vue';

export default {
  name: 'Location',
  components: {
    LocationMap
  }
}
</script>

<style scoped>
.location {
  width: 50%;
  height: 100%;
}
</style>
