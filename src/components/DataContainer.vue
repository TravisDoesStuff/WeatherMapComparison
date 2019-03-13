<template>
  <div class='dataContainer'>
    <SummaryRow />
    <DataRow v-for='(label, index) in labels' v-bind:label='label' v-bind:index='index' v-bind:key='index' />
    <button v-if='!isExpanded' id='expandButton' @click='expand'>Click to Expand</button>
    <div v-if='isExpanded' class='expandedData'>
      <DataRow v-for='(expandedLabel, index) in expandedLabels' v-bind:label='expandedLabel' v-bind:index='index' v-bind:key='index' />
    </div>
  </div>
</template>

<script>
import SummaryRow from './SummaryRow';
import DataRow from './DataRow';

const labels = [
  'Temperature',
  'Dew Point',
  'Pressure',
  'Wind',
];
const expandedLabels = [
  'Cloud Cover',
  'UV Index',
  'Visibility',
  'Latitude',
  'Longitude',
  'Elevation',
  'Climate',
]

export default {
  name: 'DataContainer',
  components: {
    SummaryRow,
    DataRow
  },
  data() {
    return {
      labels: [],
      isExpanded: false
    }
  },
  mounted() {
    this.labels = labels;
    this.expandedLabels = expandedLabels;
  },
  methods: {
    expand() {
      this.isExpanded = true;
    }
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
#expandButton {
  width: 100%;
  background: rgba(0,0,0,0);
  border: none;
  padding: 10px;
  font-size: 24px;
  cursor: pointer;
}
</style>
