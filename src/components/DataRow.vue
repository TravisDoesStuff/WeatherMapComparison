<template>
  <div class='dataRow'>
    {{ item }}
  </div>
</template>

<script>

export default {
  name: 'DataRow',
  props: [
    'item'
  ]
}
</script>

<style scoped>
.dataRow {
  font-size: 24px;
  text-align: center;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  border-bottom: 3px solid black;
  padding: 20px;
}
</style>
