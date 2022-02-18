<template>
  <div class='dataRow'>
    <div class='label'>{{ label }}</div>
    <div class='datas'>
      <div class='dataParam' v-if='this.param'>
        {{ this.lead+this.param+this.unit }}
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
    }
  },
  methods: {
    format(column) {
      let formatted = '';
      this.lead = '';
      this.unit = '';

      switch(this.label) {
        case 'Temperature':
          formatted = Math.round(column.weather.main.temp);
          this.unit = '°F';
          break;
        case 'Feels Like':
          formatted = Math.round(column.weather.main.feels_like);
          this.unit = '°F';
          break;
        case 'Pressure':
          formatted = Math.round(column.weather.main.pressure);
          this.unit = 'hPa';
          break;
        case 'Wind':
          this.lead = this.formatWind(column.weather.wind.deg);
          formatted = Math.round(column.weather.wind.speed);
          this.unit = ' mph'
          break;
        case 'Cloud Cover':
          formatted = Math.round(column.weather.clouds.all);
          this.unit = '%';
          break;
        case 'Visibility':
          formatted = Math.round(column.weather.visibility);
          this.unit = ' meters';
          break;
        case 'Climate':
          formatted = column.climate;
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
    formatWind(windHeading) {
      return this.formatWindDirections(windHeading)+" at ";
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
  padding: 5px 0;
  font-size: 18px;
}
.label {
  color: darkslategray;
  font-size: 10px;
  font-weight: bold;
  margin-left: 10px;
}
.dataParam {
  margin-left: 25px;
}
</style>
