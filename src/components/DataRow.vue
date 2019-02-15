<template>
  <div class='dataRow'>
    <div class='label'>{{ label }}</div>
    <div class='datas'>
      <div class='dataParam'>{{ this.param }}</div>
      <div class='dataParam'>{{ comparisonOperator }}</div>
      <div class='dataParam'>{{ this.awayParam }}</div>
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
      return this.$store.state.homeData.weather[this.label];
    },
    awayParam() {
      return this.$store.state.awayData.weather[this.label];
    },
    comparisonOperator() {
      return '=';
    }
  }
}
</script>

<style scoped>
.dataRow {
  border-bottom: 3px solid silver;
  vertical-align: top;
}
.datas {
  display: flex;
  justify-content: space-evenly;
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
