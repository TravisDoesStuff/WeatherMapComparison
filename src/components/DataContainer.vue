<template>
  <div class='dataContainer'>
    <SummaryRow />
    <DataRow v-for='(label, index) in labels' v-bind:label='label' v-bind:index='index' v-bind:key='index' />
  </div>
</template>

<script>
import SummaryRow from './SummaryRow';
import DataRow from './DataRow';

const labels = [
  'Temperature',
  'Feels Like',
  'Pressure',
  'Wind',
  'Cloud Cover',
  'Visibility',
  'Latitude',
  'Longitude',
  'Elevation',
  'Climate',
];

export default {
  name: 'DataContainer',
  components: {
    SummaryRow,
    DataRow
  },
  data() {
    return {
      labels: [],
    }
  },
  mounted() {
    this.labels = labels;
  }
}
</script>

<style scoped>
.dataContainer {
  height: 450px;
  overflow-y: scroll;
  padding-top: 15px;
}
.dataContainer::-webkit-scrollbar {
  width: 10px;
}
.dataContainer::-webkit-scrollbar-track {
  background-color: rgba(0,0,0,0);
}
.dataContainer::-webkit-scrollbar-thumb {
  background: black;
  border-radius: 10px;
}
.dataContainer::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0,0,0,0.8);
}
</style>
