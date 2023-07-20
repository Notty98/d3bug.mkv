<template>
    <!--<img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <NavBar></NavBar>
    <div>
        <h1>Gallery</h1>
        <b-dropdown text="Available collections">
            <b-dropdown-item v-for="item in collections" :value="item.collection_id" :key="item.collection_id" @click="event => updateSelection(event, item)">{{ item.collection_name }}</b-dropdown-item>
        </b-dropdown>
    </div>
    <div v-if="collectionName && selectedCollection">
        <h1>{{ collectionName }}</h1>
        <div v-for="(url, index) in urls" :key="index">
            <h3>{{ names[index] }}</h3>
            <img  :src="url" :key="index" crossorigin="anonymous" />
        </div>
        
    </div>
</template>
  
<script>

    import NavBar from '../components/NavBar.vue'

    import { getCollections, getAllPhotosOfCollection, currentUrl } from '../services/services'

    export default {
        name: 'GalleryPage',
        props: { },
        components: {
            NavBar
        },
        data() {
            return {
                collections: [],
                selectedCollection: null,
                collectionName: null,
                urls: [],
                names: []
            }
        },
        mounted() {
            getCollections().then(data => { 
                this.collections = data.data
            })
        },
        methods: {
            clear() {
                this.urls = []
                this.names = []
            },
            updateSelection(event, item) {
                this.clear()
                this.selectedCollection = item.collection_id
                this.collectionName = item.collection_name
                this.updateGallery()
            },
            updateGallery() {
                getAllPhotosOfCollection(this.selectedCollection).then(data => {
                    console.log(data)
                    for(const photo of data.data) {
                        const filename = photo.filename
                        this.urls.push(`http://${currentUrl}/resources/${filename}`)
                        this.names.push(filename)
                    }
                })
            }
        }
    }
</script>

<style>
    img {
        width: 100%;
        height: 100%;
    }
</style>
  