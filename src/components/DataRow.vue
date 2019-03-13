<template>
  <div class='dataRow' v-bind:class="{ isEven: this.index%2 === 0 }">
    <div class='label'>{{ label }}</div>
    <div class='datas'>
      <div class='dataParam' v-if='this.param'>
        {{ this.lead+this.param+this.unit }}
      </div>
      <div class='dataParam' v-if='this.param && this.awayParam'>
        {{ comparisonOperator }}
      </div>
      <div class='dataParam' v-if='this.awayParam'>
        {{ this.lead+this.awayParam+this.unit }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DataRow',
  props: [
    'label',
    'index'
  ],
  computed: {
    param() {
      if(this.$store.state.homeData.isLoaded) {
        return this.format(this.$store.state.homeData);
      }
      return false;
    },
    awayParam() {
      if(this.$store.state.awayData.isLoaded) {
        return this.format(this.$store.state.awayData);
      }
      return false;
    },
    comparisonOperator() {
      let operator = '';
      if(!isNaN(this.param) && !isNaN(this.awayParam)) {
        if(this.param > this.awayParam) {
        operator = '>';
        } else if(this.param < this.awayParam) {
          operator = '<';
        } else {
          operator = '=';
        }
      }

      return operator;
    }
  },
  methods: {
    format(column) {
      let formatted = '';
      this.lead = '';
      this.unit = '';

      switch(this.label) {
        case 'Temperature':
          formatted = Math.round(column.weather.temperature);
          this.unit = '°F';
          break;
        case 'Dew Point':
          formatted = Math.round(column.weather.dewPoint);
          this.unit = '°F';
          break;
        case 'Pressure':
          formatted = Math.round(column.weather.pressure);
          this.unit = 'mb';
          break;
        case 'Wind':
          this.lead = this.formatWind(column.weather);
          formatted = Math.round(column.weather.windSpeed);
          this.unit = ' mph'
          break;
        case 'Cloud Cover':
          formatted = Math.round(column.weather.cloudCover*100);
          this.unit = '%';
          break;
        case 'UV Index':
          formatted = column.weather.uvIndex;
          break;
        case 'Visibility':
          formatted = Math.round(column.weather.visibility);
          this.unit = ' miles';
          break;
        case 'Climate':
          formatted = column.climate;
          break;
        case 'Latitude':
          formatted = Math.round(column.elevation.lat*1000)/1000;
          this.unit = '°'
          break;
        case 'Longitude':
          formatted = Math.round(column.elevation.lon*1000)/1000;
          this.unit = '°'
          break;
        case 'Elevation':
          formatted = Math.round(column.elevation.elevation * 3.281);
          this.unit = ' feet';
          break;
        default:
          break;
      }

      return formatted;
    },
    formatWind(weather) {
      return this.formatWindDirections(weather.windBearing)+" at ";
    },
    formatWindDirections(degrees) {
      let cardinalDirections = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
      let heading = Math.round((  (degrees % 360) / 45)) % 8;

      return cardinalDirections[heading];
    },
  },
}
</script>

<style scoped>
.dataRow {
  border-bottom: 3px solid darkslategray;
  vertical-align: top;
}
.datas {
  display: flex;
  justify-content: space-around;
  padding: 5px 0;
  font-size: 24px;
  text-align: center;
}
.label {
  color: darkslategray;
  font-size: 10px;
  font-weight: bold;
  margin-left: 10px;
}
.dataParam {
  max-width: 40%;
}
</style>
