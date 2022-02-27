<template>
  <div class='summaryRow'>
    <div v-if='this.$store.state.homeData.isLoaded' class='summary'>
      <div :class='getDaylightStatus()'>{{ this.getLocalTime(this.$store.state.homeData.weather) }}</div>
      <div class='locationHeader'>{{ this.handleLocationName(this.$store.state.homeData.address) }}</div>
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
    getLocalTime(weatherData) {
      const localTime = Math.floor(Date.now()/1000) + weatherData.timezone;
      const formattedDate = new Date(localTime*1000);
      return formattedDate.getHours() + ":" + formattedDate.getMinutes();
    },
    handleLocationName(address) {
      if(address === ', '){
        return this.$store.state.homeData.weather.name;
      } else {
        return address;
      }
    },
    handleWeatherIcon(code) {
      const isDaylight = this.isDaylight();
        let icon = '';
        if(code < 600) {
          icon = 'rain';
        } else if(code < 700) {
          icon = 'snow';
          if(code >= 611) {
            icon = 'sleet';
          }
        } else if(code < 800) {
          icon = 'fog';
        } else if(code === 800) {
          if(isDaylight) {
            icon = 'clear-day';
          } else {
            icon = 'clear-night';
          }
        } else if(code === 801 || code === 802){
          if(isDaylight) {
            icon = 'partly-cloudy-day';
          } else {
            icon = 'partly-cloudy-night';
          }
        } else {
          icon = 'clouds';
        }

        return icon
    },
    isDaylight() {
      let isDay = false;
      const daylightObj = this.$store.state.homeData.daylight;
      if(Date.now()>Date.parse(daylightObj.sunrise) && Date.now()<Date.parse(daylightObj.sunset)) {
        isDay = true;
      } else {
        isDay = false;
      }
      return isDay;
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
  min-height: 173px;
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
  text-align: right;
}
.civil_twilight {
  background-color: #3E82D8;
  height: 15px;
  text-align: right;
}
.nautical_twilight {
  background-color: #2B5B9E;
  height: 15px;
  text-align: right;
}
.astronomical_twilight {
  background-color: #1D3E73;
  height: 15px;
  text-align: right;
}
.night {
  background-color: #10234A;
  height: 15px;
  text-align: right;
}
</style>
