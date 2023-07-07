<template>
    <!--<img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <NavBar></NavBar>
    <div>
        <h1>Upload a geojson</h1>
        <input type="file" @change="event => handleFiles(event)" />
    </div>

    <div>
        <h1>Remove an uploaded geojson</h1>
        <select v-model="selectedGeoJson">
            <option disabled selected value> -- select an option -- </option>
            <option v-for="item in geojsons" :value="item.geojson_id" :key="item.geojson_id">{{ item.geojson_name }}</option>
        </select>
        <button @click="event => handleRemoveSelectedGeojson(event)">Remove the selected geojson</button>
    </div>
    <div>
        <h1>Remove all uploaded geojsons</h1>
        <button @click="event => handleRemoveAllGeojson(event)">Remove all</button>
    </div>
    
</template>
  
<script>

import NavBar from '../components/NavBar.vue'
import { addGeoJson, getGeoJsons, removeGeojsonById, removeAllGeoJsons } from '../services/services'
  
export default {
    name: 'GeoJson',
    components: {
        NavBar
    },
    data() {
        return {
            formData: null,
            geojsons: [],
            selectedGeoJson: null
        }
    },
    mounted() {
        getGeoJsons()
            .then(data => {
                for(const item of data.data) {
                    this.geojsons.push(item)
                }
            })
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
        },
        handleRemoveSelectedGeojson(event) {
            console.log(event)
            removeGeojsonById(this.selectedGeoJson)
                .then(data => {
                    console.log(data)
                    window.location.reload()
                })
        },
        handleRemoveAllGeojson(event) {
            console.log(event)
            removeAllGeoJsons()
                .then(data => {
                    console.log(data)
                    window.location.reload()
                })
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
  