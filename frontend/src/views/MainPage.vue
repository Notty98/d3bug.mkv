<template>
    <!--<img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <NavBar></NavBar>
    <MapContainer></MapContainer>
</template>
  
  <script>
  //import HelloWorld from './components/HelloWorld.vue'
  import MapContainer from '../components/MapComponent.vue'
  import NavBar from '../components/NavBar.vue';
  
  export default {
    name: 'MainPage',
    components: {
      //HelloWorld,
      MapContainer,
      NavBar
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
    height: 100%;
    width: 100%;
  }
  </style>
  