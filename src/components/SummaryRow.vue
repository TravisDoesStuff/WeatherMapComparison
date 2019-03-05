<template>
  <div class='summaryRow'>
    <div v-if='this.$store.state.homeData.isLoaded' class='summary'>
      <div class='locationHeader'>{{ this.$store.state.homeData.address }}</div>
      <div><img class='weatherIcon' :src='getHomeIcon()'></div>
      <div class='locationCondition'>{{ this.$store.state.homeData.weather.summary }}</div>
    </div>
    <div v-if='this.$store.state.awayData.isLoaded' class='summary'>
      <div class='locationHeader'>{{ this.$store.state.awayData.address }}</div>
      <div><img class='weatherIcon' :src='getAwayIcon()'></div>
      <div class='locationCondition'>{{ this.$store.state.awayData.weather.summary }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SummaryRow',
  methods: {
    getHomeIcon() {
      if(this.$store.state.homeData.isLoaded) {
        return require('../assets/icons/'+this.$store.state.homeData.weather.icon+'.png');
      }
    },
    getAwayIcon() {
      if(this.$store.state.awayData.isLoaded) {
        return require('../assets/icons/'+this.$store.state.awayData.weather.icon+'.png');
      }
    }
  }
}
</script>

<style scoped>
.summaryRow {
  display: flex;
  justify-content: space-around;
  border-bottom: 3px solid darkslateblue;
  text-align: center;
  width: 100%;
  padding-bottom: 15px;
}
.locationHeader {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}
.locationCondition {
  font-size: 24px;
}
.weatherIcon {
  height: 80px;
}
.summary {
  width: 50%;
}
</style>
