<template>
    <!--<img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <NavBar></NavBar>
    <HeatMapComponent></HeatMapComponent>
</template>
  
<script>
    //import HelloWorld from './components/HelloWorld.vue'
    import HeatMapComponent from '../components/HeatMap.vue'
    import NavBar from '../components/NavBar.vue';

    export default {
    name: 'HeatMapView',
    props: { },
    components: {
        HeatMapComponent,
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
