<template>
    <NavBar></NavBar>
    <div class="hello">
        <h1>GeoJson Filter page</h1>
        <div v-for="(geojson, index) in geojson" :key="index">
            <h3>{{ geojsonName[index] }}</h3>
            <div v-for="(feature, featureIndex) in geojson.features" :key="featureIndex">
                <label>
                    <input type="checkbox" :value="featureIndex" @change="e => handleChange(e, featureIndex, index)" :checked="handleCheck(index, featureIndex)"/>
                    {{ tryToGetTheRightProperties(feature.properties) }}
                </label>
            </div>
        </div>
    </div>
</template>

<script>
    import NavBar from '@/components/NavBar.vue'
    import { getGeoJsons } from '../services/services'
    import { getMapFromStorage, saveMapToStorage } from '../storage/localstorage'

    export default {
        name: 'GeoJsonFilter',
        components: {
            NavBar
        },
        props: { },
        data() {
            return {
                geojson: [],
                geojsonName: [],
                selectedFeatures: null
            }
        },
        created() {
            /*this.selectedFeatures = this.getMapFromStorage()
            console.log(this.selectedFeatures)*/
            this.selectedFeatures = getMapFromStorage()
            console.log(this.selectedFeatures)
        },
        mounted() {
            getGeoJsons().then((data) => {
                console.log(data)
                for(const item of data.data) {
                    const jsonGeoJson = JSON.parse(item['geojson_geom'])
                    this.geojson.push(jsonGeoJson)
                    this.geojsonName.push(item['geojson_name'])
                }
            })

        },
        methods: {
            handleCheck(geoJsonKey, featuresKey) {
                return this.selectedFeatures.get(geoJsonKey + '-' + featuresKey)
            },
            tryToGetTheRightProperties(properties) {
                const regex = /nome|name/u
                let defaultString = null
                for(const item of Object.keys(properties)) {
                    if(!defaultString) {
                        defaultString = properties[item]
                    }
                    if(item.match(regex)) {
                        return properties[item]
                    }
                }
                return defaultString
            },
            /*saveMapToStorage() {
                const hashMapString = JSON.stringify(Array.from(this.selectedFeatures.entries()))
                localStorage.setItem('selectedFeatures', hashMapString)
            },
            getMapFromStorage() {
                const stringMap = localStorage.getItem('selectedFeatures')
                if(!stringMap) {
                    return new Map()
                }
                return new Map(JSON.parse(stringMap))
            },*/
            handleChange(event, featureIndex, geoJsonIndex) {
                console.log(event)
                const isChecked = event.target.checked
                const key = geoJsonIndex + '-' + featureIndex
                if(isChecked) {
                    this.selectedFeatures.set(key, isChecked)
                } else {
                    this.selectedFeatures.delete(key)
                }
                saveMapToStorage(this.selectedFeatures)   
            }

        }
    }
</script>
  