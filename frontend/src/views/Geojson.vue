<template>
    <!--<img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <NavBar></NavBar>
    <h1>Geojson handler!</h1>
    <input type="file" @change="event => handleFiles(event)" />
</template>
  
<script>

import NavBar from '../components/NavBar.vue'
import { mapState, mapMutations } from 'vuex';
  
export default {
    name: 'GeoJson',
    components: {
        NavBar
    },
    data() {
        return {
        }
    },
    mounted() {
    },
    computed: { ...mapState(['geojson']) },
    methods: {
        ...mapMutations(['setGeoJson']),
        handleFiles(event) {
            console.log('file uploaded!')
            const geoJsonFile = event.target.files[0]

            const reader = new FileReader()
            reader.onload = (event) => {
                const geojson = JSON.parse(event.target.result)
                //console.log(geojson)
                // push to mainMapcomponent
                this.setGeoJson(geojson)
                this.$router.push({ name: 'Home' });
            }
            reader.readAsText(geoJsonFile)
        }
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
  