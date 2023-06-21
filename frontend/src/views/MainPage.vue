<template>
    <!--<img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <NavBar></NavBar>
    <MainMapContainer :geojson="geojson"></MainMapContainer>
</template>
  
  <script>
  //import HelloWorld from './components/HelloWorld.vue'
  import MainMapContainer from '../components/MainMapComponent.vue'
  import NavBar from '../components/NavBar.vue';

  import { mapState } from 'vuex';
  
  export default {
    name: 'MainPage',
    props: {
      /*geojson: {
        type: Object,
        default: null
      }*/
    },
    components: {
      //HelloWorld,
      MainMapContainer,
      NavBar
    },
    computed: { ...mapState(['geojson']) },
    mounted() {
      console.log(this.geojson)
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
  