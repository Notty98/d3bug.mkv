<template>
    <!--<img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <NavBar></NavBar>
    <MainMapContainer></MainMapContainer>
</template>
  
  <script>
  //import HelloWorld from './components/HelloWorld.vue'
  import MainMapContainer from '../components/MainMapComponent.vue'
  import NavBar from '../components/NavBar.vue';
  
  export default {
    name: 'MainPage',
    props: { },
    components: {
      MainMapContainer,
      NavBar
    },
    mounted() { }
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
  