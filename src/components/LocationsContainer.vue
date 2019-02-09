<template>
  <div class='locationsContainer'>
    <Location />
  </div>
</template>

<script>
import Location from './Location.vue';

export default {
  name: 'LocationsContainer',
  components: {
    Location
  }
}
</script>

<style scoped>
.locationsContainer {
  width: 100%;
  height: 100%;
}
</style>
