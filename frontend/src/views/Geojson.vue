<template>
    <!--<img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <NavBar></NavBar>
    <h1>Geojson handler!</h1>
    <input type="file" @change="event => handleFiles(event)" />
</template>
  
<script>

import NavBar from '../components/NavBar.vue'
import { addGeoJson } from '../services/services'
  
export default {
    name: 'GeoJson',
    components: {
        NavBar
    },
    data() {
        return {
            formData: null
        }
    },
    mounted() {
        console.log(this.geojson)
    },
    methods: {
        async handleFiles(event) {
            console.log('file uploaded!')
            const geoJsonFile = event.target.files[0]

            this.formData = new FormData()
            this.formData.append('geojson', geoJsonFile)
            await addGeoJson(this.formData)
            //this.addGeoJson(geojson)
            this.$router.push({ name: 'Home' });
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
  