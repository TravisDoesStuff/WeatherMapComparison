<template>
  <div class='dataRow'>
    <div class='label'>{{ label }}</div>
    <div class='datas'>
      <div class='dataParam'>{{ this.param+this.unit }}</div>
      <div class='dataParam'>{{ comparisonOperator }}</div>
      <div class='dataParam'>{{ this.awayParam+this.unit }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DataRow',
  props: [
    'label',
  ],
  computed: {
    param() {
      return this.format(this.$store.state.homeData);
    },
    awayParam() {
      return this.format(this.$store.state.awayData);
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
          formatted = this.formatWind(column.weather);
          break;
        case 'Cloud Cover':
          formatted = column.weather.cloudCover*100;
          this.unit = '%';
          break;
        case 'UV Index':
          formatted = column.weather.uvIndex;
          break;
        case 'Visibility':
          formatted = Math.round(column.weather.visibility);
          this.unit = ' miles';
          break;
        case 'Ozone':
          formatted = column.weather.ozone;
          this.unit = ' DU';
          break;
        case 'Climate':
          formatted = column.climate;
          break;
        default:
          break;
      }

      return formatted;
    },
    formatWind(weather) {
      return this.formatWindDirections(weather.windBearing)+" at "+Math.round(weather.windSpeed)+" mph";
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
  border-bottom: 3px solid silver;
  vertical-align: top;
}
.datas {
  display: flex;
  justify-content: space-around;
  padding: 5px 60px;
}
.label {
  color: grey;
  font-size: 10px;
  font-weight: bold;
}
.datas {
  font-size: 24px;
}
</style>
