<template>
  <div class='summaryRow'>
    <div v-if='this.$store.state.homeData.isLoaded' class='summary'>
      <div :class='getDaylightStatus()'></div>
      <div class='locationHeader'>{{ this.$store.state.homeData.address }}</div>
      <div class='locationCoordinates'>{{ Math.round(this.$store.state.homeData.elevation.lat*10000)/10000 }}, {{ Math.round(this.$store.state.homeData.elevation.lon*10000)/10000 }}</div>
      <div><img class='weatherIcon' :src='getHomeIcon()'></div>
      <div class='locationCondition'>{{ this.$store.state.homeData.weather.weather[0].description }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SummaryRow',
  methods: {
    getHomeIcon() {
      if(this.$store.state.homeData.isLoaded) {
        return require('../assets/icons/'+this.handleWeatherIcon(this.$store.state.homeData.weather.weather[0].id)+'.png');
      }
    },
    handleWeatherIcon(code) {
        let icon = 'clear-night';
        if(code < 600) {
          icon = 'rain';
        } else if(code < 700) {
          icon = 'snow';
        } else if(code < 800) {
          icon = 'fog';
        } else if(code === 800) {
          icon = 'clear-day';
        } else {
          icon = 'clouds';
        }

        return icon
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
  border-bottom: 3px solid darkslateblue;
  width: 100%;
  padding-bottom: 15px;
}
.locationHeader {
  font-size: 24px;
  font-weight: bold;
}
.locationCondition {
  font-size: 24px;
}
.weatherIcon {
  height: 80px;
}
.summary {
  /* width: 50%; */
}

.daylight {
  background-color: #4A9CFF;
  height: 15px;
}
.civil_twilight {
  background-color: #3E82D8;
  height: 15px;
}
.nautical_twilight {
  background-color: #2B5B9E;
  height: 15px;
}
.astronomical_twilight {
  background-color: #1D3E73;
  height: 15px;
}
.night {
  background-color: #10234A;
  height: 15px;
}
</style>
