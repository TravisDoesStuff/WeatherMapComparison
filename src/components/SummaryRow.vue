<template>
  <div class='summaryRow'>
    <div v-if='this.$store.state.homeData.isLoaded' class='summary' :class='getDaylightStatus()'>
      <div class='locationHeader'>{{ this.$store.state.homeData.address }}</div>
      <div><img class='weatherIcon' :src='getHomeIcon()'></div>
      <div class='locationCondition'>{{ this.$store.state.homeData.weather.summary }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SummaryRow',
  methods: {
    getHomeIcon() {
      if(this.$store.state.homeData.isLoaded) {
        // return require('../assets/icons/'+this.$store.state.homeData.weather.main+'.png');
      }
    },
    getDaylightStatus() {
      let daylight;
      let daylightObj = this.$store.state.homeData.daylight;
      let time = Date.now();
      if(time <= Date.parse(daylightObj.astronomical_twilight_begin)){
        daylight = 'night';
      }
      else if(time <= Date.parse(daylightObj.nautical_twilight_begin)){
        daylight = 'astronomical_twilight';
      }
      else if(time <= Date.parse(daylightObj.civil_twilight_begin)){
        daylight = 'nautical_twilight';
      }
      else if(time <= Date.parse(daylightObj.sunrise)) {
        daylight = 'civil_twilight';
      }
      else if(time <= Date.parse(daylightObj.sunset)) {
        daylight = 'daylight';
      }
      else if(time <= Date.parse(daylightObj.civil_twilight_end)) {
        daylight = 'civil_twilight';
      }
      else if(time <= Date.parse(daylightObj.nautical_twilight_end)) {
        daylight = 'nautical_twilight';
      }
      else if(time <= Date.parse(daylightObj.astronomical_twilight_end)) {
        daylight = 'astronomical_twilight';
      }
      return daylight;
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

.daylight {
  color: white;
  background-color: #4A9CFF;
}
.civil_twilight {
  color: white;
  background-color: #3E82D8;
}
.nautical_twilight {
  color: white;
  background-color: #2B5B9E;
}
.astronomical_twilight {
  color: white;
  background-color: #1D3E73;
}
.night {
  color: white;
  background-color: #10234A;
}
</style>
