<template>
    <!--<img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <NavBar></NavBar>
    <div>
        <h1>GeoJson Gallery</h1>
        <b-dropdown text="Available geojsons">
            <b-dropdown-item v-for="(feature, featureIndex) in dropdownGeoJson" :disabled="isString(feature)" :value="featureIndex" :key="featureIndex" @click="event => updateSelection(event, feature)">{{ tryToGetTheRightProperties(feature) }}</b-dropdown-item>
        </b-dropdown>
    </div>
    <div v-if="urls.length > 0 && names.length > 0">
        <div v-for="(url, index) in urls" :key="index">
            <h3>{{ names[index] }}</h3>
            <img  :src="url" :key="index" crossorigin="anonymous" />
        </div>
    </div>
</template>
  
<script>

    import NavBar from '../components/NavBar.vue'

    import { getGeoJsons, getAllPhotos, currentUrl } from '../services/services'

    import { transform } from 'ol/proj'

    import { GeoJSON } from 'ol/format'

    export default {
        name: 'GeoJsonGallery',
        props: { },
        components: {
            NavBar
        },
        data() {
            return {
                geojsons: [],
                dropdownGeoJson: [],
                urls: [],
                names: [],
                features: []
                
            }
        },
        mounted() {
            getGeoJsons().then(data => { 
                for(const item of data.data) {
                    this.dropdownGeoJson.push(item['geojson_name'])
                    const jsonGeoJson = JSON.parse(item['geojson_geom'])

                    for(const feature of jsonGeoJson.features) {
                        this.dropdownGeoJson.push(feature)
                    }
                }
            })
        },
        methods: {
            clear() {
                this.urls = []
                this.names = []
            },
            updateSelection(event, item) {
                this.clear()
                this.updateGallery(item)
            },
            updateGallery(feature) {
                console.log(feature)
                const format = new GeoJSON()
                const openLayersFeature = format.readFeature(feature)
                const geoJsonGeometry = openLayersFeature.getGeometry().transform('EPSG:4326', 'EPSG:3857')

                getAllPhotos().then(data => {
                    for(const photo of data.data) {
                        const coordinates = photo.photo_position

                        const transformedCoordinates = transform([coordinates.x, coordinates.y], 'EPSG:4326', 'EPSG:3857')
                        
                        const isInside = geoJsonGeometry.intersectsCoordinate(transformedCoordinates)
                        if(isInside) {
                            console.log(photo)
                            const filename = photo.filename
                            this.urls.push(`http://${currentUrl}/resources/${filename}`)
                            this.names.push(filename) 
                        }
                    }
                })
            },
            isString(feature) {
                return typeof feature === 'string'
            },
            tryToGetTheRightProperties(feature) {
                if(typeof feature === 'string') {
                    return feature
                }
                const regex = /nome|name|ADMIN/u
                let defaultString = null
                for(const item of Object.keys(feature.properties)) {
                    if(!defaultString) {
                        defaultString = feature.properties[item]
                    }
                    if(item.match(regex)) {
                        return feature.properties[item]
                    }
                }
                return defaultString
            },
        }
    }
</script>

<style>
    img {
        width: 100%;
        height: 100%;
    }
</style>
  