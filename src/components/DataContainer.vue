<template>
  <div class='dataContainer'>
    <SummaryRow />
    <DataRow v-for='(label, index) in labels' v-bind:label='label' v-bind:index='index' v-bind:key='index' />
    <button v-if='!isExpanded' id='expandButton' @click='expand'>Click to expand</button>
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
  'Ozone',
  'Climate'
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
  height: 397px;
  overflow-y: scroll;
  border-left: 3px solid grey;
  box-shadow: 5px 5px 20px silver;
  background: white;
}
.dataContainer::-webkit-scrollbar {
  width: 7px;
}
.dataContainer::-webkit-scrollbar-track {
  background-color: grey;
}
.dataContainer::-webkit-scrollbar-thumb {
  background: black;
  border-radius: 7px;
}
.dataContainer::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0,0,0,0.8);
}
#expandButton {
  width: 100%;
}
</style>
