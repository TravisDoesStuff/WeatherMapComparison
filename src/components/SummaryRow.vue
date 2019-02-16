<template>
  <div class='summaryRow'>
    <div>
      <div class='locationHeader'>{{ this.$store.state.homeData.address }}</div>
      <div>{{ this.$store.state.homeData.weather.icon }}</div>
      <div class='locationCondition'>{{ this.$store.state.homeData.weather.summary }}</div>
    </div>
    <div />
    <div>
      <div class='locationHeader'>{{ this.$store.state.awayData.address }}</div>
      <div>{{ this.$store.state.awayData.weather.icon }}</div>
      <div class='locationCondition'>{{ this.$store.state.awayData.weather.summary }}</div>
    </div>
  </div>
</template>

<script>
// icons:
// clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night

export default {
  name: 'SummaryRow'
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
}
.locationCondition {
  font-size: 24px;
}
</style>
