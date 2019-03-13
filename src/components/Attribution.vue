<template>
  <div id='attribution'>
    <a href='https://darksky.net/poweredby/' target='_blank'>Powered by Dark Sky</a>
    |
    <a href='https://sunrise-sunset.org/' target='_blank'>Sunrise-Sunset</a>
    |
    <a href='https://developers.arcgis.com/rest/' target='_blank'>ArcGIS Rest API</a>
    |
    <a href='http://climateapi.scottpinkelman.com/' target='_blank'>Climate Zone API</a>
    |
    <a href='https://elevation-api.io' target='_blank'>Elevation API</a>
  </div>
</template>

<script>

</script>

<style scoped>
#attribution {
  position: fixed;
  bottom: 0%;
  width: 100%;
  z-index: 1000;
  background-color: #000000;
  text-align: center;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  color: white;
  padding: 10px;
}
a, a:visited {
  color: white;
}
</style>