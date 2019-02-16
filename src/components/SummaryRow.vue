<template>
  <div class='summaryRow'>
    <div>
      <div class='locationHeader'>{{ this.$store.state.homeData.address }}</div>
      <div><img class='weatherIcon' :src='getHomeIcon()'></div>
      <div class='locationCondition'>{{ this.$store.state.homeData.weather.summary }}</div>
    </div>
    <div />
    <div>
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
      return require('../assets/icons/'+this.$store.state.homeData.weather.icon+'.png');
    },
    getAwayIcon() {
      return require('../assets/icons/'+this.$store.state.awayData.weather.icon+'.png');
    }
  }
}
</script>

<style scoped>
.summaryRow {
  display: flex;
  justify-content: space-around;
  padding: 5px 60px;
  border-bottom: 3px solid grey;
  text-align: center;
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
</style>
