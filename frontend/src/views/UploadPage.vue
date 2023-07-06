<template>
    <!--<img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <NavBar></NavBar>
    <div v-if="selectedCollection == null">
        <h1>Select an existing collection</h1>
        <b-dropdown text="Available collections">
            <b-dropdown-item v-for="item in collections" :value="item.collection_id" :key="item.collection_id" @click="event => updateSelection(event, item)">{{ item.collection_name }}</b-dropdown-item>
        </b-dropdown>
        <!--<b-button variant="success" @click="event => handle(event)">Create Collection</b-button>-->
        <h1>Create a new collection</h1>
        <b-form-group
            id="collection-group-name"
            label="Collection Name"
            label-for="collection-name">
            <b-form-input
                id="collection-name"
                type="text"
                placeholder="Enter collection name"
                v-model="collection_name"
                required
            ></b-form-input>
        </b-form-group>
        <b-form-group
            id="collection-group-desc"
            label="Collection Description"
            label-for="collection-desc">
            <b-form-input
                id="collection-desc"
                type="text"
                placeholder="Enter collection description"
                v-model="collection_desc"
            ></b-form-input>
        </b-form-group>
        <b-button variant="success" @click="event => handleCreationOfCollection(event)">Continue</b-button>
    </div>
    <div v-if="files.length == 0 && selectedCollection != null">
        <h1>Select the file(s) to upload</h1>
        <input type="file" @change="event => handleFiles(event)" accept="image/png, image/jpeg, image/jpg" webkitdirectory multiple />
        <input type="file" @change="event => handleFiles(event)" accept="image/png, image/jpeg, image/jpg" />
    </div>
    <div v-if="files.length > 0 && selectedCollection != null" style="height: 100%;">
        <h1>Choose the point on the map for the {{ this.files[index].name }} image</h1>
        <div style="height: 50%;">
            <MapComponent v-on:update:latitude="latitude => updateLatitude(latitude)" v-on:update:longitude="longitude => updateLongitude(longitude)" ref="mapComponent"></MapComponent>
        </div>
        <b-button variant="success" @click="event => handleContinueButton(event)">Continue</b-button>
        <b-button variant="success" @click="event => handleKeepCurrentPosition(event)" v-if="files.length > 1">Keep the current position for the remaining file</b-button>
    </div>
</template>
  
<script>

import NavBar from '../components/NavBar.vue'
import MapComponent from '../components/MapComponent.vue'
import { getCollections, createCollection, addPhotoToCollection } from '../services/services'
  
export default {
    name: 'UploadPage',
    components: {
        NavBar,
        MapComponent
    },
    data() {
        return {
            latitude: null,
            longitude: null,
            files: [],
            //formData: new FormData(),
            formData: [],
            index: 0,
            collections: [],
            selectedCollection: null,
            collection_name: null,
            collection_desc: null
        }
    },
    mounted() {
        getCollections().then(data => { 
            this.collections = data.data
        })
    },
    methods: {
        updateLatitude(latitude) {
            this.latitude = latitude
        },
        updateLongitude(longitude) {
            this.longitude = longitude
        },
        handleFiles(event) {
            const files = event.target.files
            this.files = files
        },
        pushFormData() {
            const formData = new FormData()
            formData.append('photo', this.files[this.index])
            formData.append('lat', this.latitude)
            formData.append('lon', this.longitude)

            this.formData.push(formData)
        },
        handleContinueButton(event) {
            console.log('click on continue')
            console.log(event)

            this.pushFormData()
            
            if(this.index + 1 < this.files.length) {
                this.index = this.index + 1
                this.$refs.mapComponent.clear()
            } else {
                this.handleUpload()
            }
                
        },
        handleKeepCurrentPosition(event) {
            console.log('click on keep position')
            console.log(event)

            this.pushFormData()

            while(this.index + 1 < this.files.length) {
                this.index = this.index + 1
                this.pushFormData()
            }
            
            this.handleUpload()

        },
        updateSelection(event, item) {
            this.selectedCollection = item.collection_id
        },
        handleCreationOfCollection(event) {
            console.log(event)
            this.selectedCollection = -1
        },
        async handleUpload() {
            for(let form of this.formData) {
                if(this.selectedCollection == -1) {
                    // create a new collections
                    console.log('create new collection')
                    form.append('name', this.collection_name)
                    form.append('desc', this.collection_desc)
                    const response = await createCollection(form)
                    this.selectedCollection = response.collectionId
                    continue
                }
                // add photo to collection
                addPhotoToCollection(form, this.selectedCollection)
            }
            console.log('done')
            this.$router.push('/')
        },
        invokeClearMarkerEvent() {
            this.$emit('clearMarkerEvent')
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
  