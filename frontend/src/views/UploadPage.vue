<template>
    <!--<img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <NavBar></NavBar>
    <div>
        <h1>Upload</h1>
        <input type="file" placeholder="select a folder" webkitdirectory multiple @change="event => handleFiles(event)" accept="image/png, image/jpeg, image/jpg"/>
        <input type="file" placeholder="select a image" @change="event => handleFile(event)" accept="image/png, image/jpeg, image/jpg"/>
        <div style="height: 50%;">
            <MapComponent></MapComponent>
        </div>
  </div>
</template>
  
<script>

import NavBar from '../components/NavBar.vue'
import MapComponent from '../components/MapComponent.vue'
  
export default {
    name: 'UploadPage',
    components: {
        NavBar,
        MapComponent
    },
    methods: {
        handleFiles(event) {
            const files = event.target.files
            console.log('handling files...')
            console.log(files)
        },
        handleFile(event) {
            console.log('handling single file...')
            console.log(event)
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
  