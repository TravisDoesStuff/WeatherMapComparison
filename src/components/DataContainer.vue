<template>
  <div class='dataContainer'>
    <div v-if="side === 'home'">
      <DataRow v-for='(param, index) in this.$store.state.homeData.weather' v-bind:item='param' v-bind:index='index' v-bind:key='index' :side='side' />
    </div>
    <div v-else-if="side === 'away'">
      <DataRow v-for='(param, index) in this.$store.state.awayData.weather' v-bind:item='param' v-bind:index='index' v-bind:key='index' :side='side' />
    </div>
  </div>
</template>

<script>
import DataRow from './DataRow';

export default {
  name: 'DataContainer',
  components: {
    DataRow
  },
  props: [
    'side'
  ]
}
</script>

<style scoped>

</style>
