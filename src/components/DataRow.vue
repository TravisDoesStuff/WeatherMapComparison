<template>
  <div class='dataRow'>
    <div class='label'>{{ label }}</div>
    <div class='datas'>
      <div class='dataParam'>{{ this.param +""+ this.unit() }}</div>
      <div class='dataParam'>{{ comparisonOperator }}</div>
      <div class='dataParam'>{{ this.awayParam +""+ this.unit() }}</div>
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
      let param = this.$store.state.homeData.weather[this.label];
      return this.format(param);
    },
    awayParam() {
      let awayParam = this.$store.state.awayData.weather[this.label];
      return this.format(awayParam);
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
    format(param) {
      let formatted = param;
      switch(this.label) {
        case 'temperature':
          formatted = Math.round(param);
          break;
        case 'dewPoint':
          formatted = Math.round(param);
          break;
        case 'windSpeed':
          formatted = Math.round(param);
          break;
        case 'cloudCover':
          formatted = param*100;
          break;
        default:
          break;
      }

      return formatted;
    },
    unit() {
      let unit = "";
      switch(this.label) {
        case 'temperature':
          unit = "°F";
          break;
        case 'dewPoint':
          unit = "°F";
          break;
        case 'pressure':
          unit = 'mb';
          break;
        case 'windSpeed':
          unit = 'mph';
          break;
        case 'windBearing':
          unit = '°';
          break;
        case 'cloudCover':
          unit = '%';
          break;
        case 'visibility':
          unit = ' miles';
          break;
        case 'ozone':
          unit = ' DU';
          break;
        default:
          break;
      }

      return unit;
    }
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
  font-family: Helvetica, Arial, sans-serif;
  font-size: 10px;
  font-weight: bold;
}
.datas {
  font-size: 24px;
  font-family: Helvetica, Arial, sans-serif;
}
</style>
