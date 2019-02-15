<template>
  <div class='dataContainer'>
    <DataRow v-for='(label, index) in labels' v-bind:label='label' v-bind:index='index' v-bind:key='index' />
  </div>
</template>

<script>
import DataRow from './DataRow';
import weatherParams from '../data/filters/weather';

export default {
  name: 'DataContainer',
  components: {
    DataRow
  },
  data() {
    return {
      labels: []
    }
  },
  mounted() {
    this.labels = weatherParams;
  }
}
</script>

<style scoped>

</style>
