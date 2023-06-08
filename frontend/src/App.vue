<template>
  <!--<img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <MapContainer></MapContainer>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import MapContainer from './components/MapComponent.vue'

export default {
  name: 'App',
  components: {
    //HelloWorld,
    MapContainer
  }
}
</script>

<style>
html, body {
  height: 100%;
  width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100%;
  width: 100%;
}
</style>
