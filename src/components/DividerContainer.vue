<template>
  <div id='dividerContainer'>
    <div id='mapPadding' />
    <DataRow v-for='(label, index) in labels' v-bind:item='label' v-bind:index='index' v-bind:key='index' />
  </div>
</template>

<script>
import weatherLabels from '../data/filters/weather';
import DataRow from './DataRow';

export default {
  name: 'DividerContainer',
  components: {
    DataRow,
  },
  props: [
    'labels'
  ],
  mounted() {
    // for(let i=0; i<weatherLabels.length; i++) {
    //   weatherLabels[i] = weatherLabels[i].replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })
    // }
    // this.labels = weatherLabels;
  }
}
</script>

<style scoped>
#mapPadding {
  height: 300px;
}
</style>
