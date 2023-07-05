<template>
    <NavBar></NavBar>
    <h1>Kmeans</h1>
    <div v-if="!isElbow">
        <input type="number" placeholder="Insert the number of clusters" @change="event => handleOnChange(event)" />
        <button :disabled="!isValidInput()" @click="event => handleClick(event)">Continue</button>
    </div>
    <div v-if="isElbow">
        <button @click="event => handleClickElbow(event)">Continue with Elbow</button>
    </div>
    <div>
        <button @click="event => updateMode(event)">Change Mode</button>
    </div>
    <div ref="map-kmeans" style="width: 100%; height: 50%;"></div>
</template>
  
<script>
  
    import NavBar from '../components/NavBar.vue'
    import { getAllPhotos } from '../services/services'
    import { getClusters, computeSSE } from '../kmeans/kmeans'

    import Feature from 'ol/Feature'
    import { Point } from 'ol/geom'
    import { transform } from 'ol/proj'

    import { OSM, Vector as VectorSource } from 'ol/source'
    import { Vector as VectorLayer } from 'ol/layer'

    import Style from 'ol/style/Style'
    import { Fill,  Stroke, Circle } from 'ol/style'

    import TileLayer from 'ol/layer/Tile'
    import View from 'ol/View'

    import Map from 'ol/Map'
  
    export default {
        name: 'KmeansPage',
        props: { },
        data() {
            return {
                numberOfCluster: null,
                markerLayer: null,
                map: null,
                isElbow: false,
                maxClusters: 5
            }
        },
        components: {
            NavBar
        },
        mounted() {
            const map = new Map({
                target: this.$refs['map-kmeans'],
                layers: [
                    new TileLayer({
                        source: new OSM()
                    })
                ],
                view: new View({
                    zoom: 0,
                    center: [0, 0],
                    constrainResolution: true
                })
            })
            this.markerLayer = new VectorLayer({
                source: new VectorSource(),
                style: new Style({
                    image: new Circle({
                        fill: new Fill({
                            color: 'white',
                        }),
                        stroke: new Stroke({
                            color: 'black',
                            width: 1,
                        }),
                        radius: 5,
                    }),
                })
            })

            map.addLayer(this.markerLayer)

            this.map = map
        },
        methods: {
            isValidInput() {
                return this.numberOfCluster && this.numberOfCluster >= 0
            },
            handleOnChange(event) {
                this.numberOfCluster = parseInt(event.target.value)
            },
            updateMode(event) {
                console.log(event)
                this.isElbow = !this.isElbow
            },
            generateSetNumberOfClusters(max) {
                let set = new Set()

                while(set.size < Math.min(max, this.maxClusters)) {
                    const randomK = 1 + Math.floor(Math.random() * max)
                    set.add(randomK)
                }

                return set
            },
            handleClickElbow(event) {
                console.log(event)
                let bestCluster = {
                    numberOfCluster: null,
                    results: null,
                    sse: null
                }

                getAllPhotos().then(data => {
                    this.addMarkerToMap(data)
                    const sources = this.markerLayer.getSource()
                    const features = sources.getFeatures()

                    let coordinateArray = []

                    features.forEach(item => {
                        const coordinates = item.getGeometry().getCoordinates()
                        coordinateArray.push(coordinates)
                    })

                    const setOfK = this.generateSetNumberOfClusters(coordinateArray.length)

                    for(const k of setOfK.values()) {
                        const results = getClusters(coordinateArray, k)
                        const sse = computeSSE(coordinateArray, results)

                        if(bestCluster.sse == null || sse < bestCluster.sse) {
                            bestCluster.sse = sse
                            bestCluster.results = results
                            bestCluster.numberOfCluster = k
                        }
                    }
                    this.numberOfCluster = bestCluster.numberOfCluster

                    console.log(bestCluster)

                    this.updateStyleOfMarker(bestCluster.results)
                })
                
            },
            handleClick(event) {
                console.log(event)
                getAllPhotos().then(data => {
                    this.addMarkerToMap(data)
                    const sources = this.markerLayer.getSource()
                    const features = sources.getFeatures()

                    let coordinateArray = []

                    features.forEach(item => {
                        const coordinates = item.getGeometry().getCoordinates()
                        coordinateArray.push(coordinates)
                    })
                    //console.log(coordinateArray)
                    const results = getClusters(coordinateArray, this.numberOfCluster)
                    //console.log(computeSSE(coordinateArray, results))
                    this.updateStyleOfMarker(results)
                })
            },
            addMarkerToMap(data) {
                this.clear()
                let markerSource = this.markerLayer.getSource()
                for(const photo of data.data) {
                    const coordinates = photo.photo_position

                    const transformedCoordinates = transform([coordinates.y, coordinates.x], 'EPSG:4326', 'EPSG:3857');

                    const markerFeature = new Feature({
                        geometry: new Point(transformedCoordinates)
                    })
                    markerSource.addFeature(markerFeature)
                }
                this.markerLayer.setSource(markerSource)
            },
            generateRandomColor() {
                const red = Math.floor(Math.random() * 255)
                const green = Math.floor(Math.random() * 255)
                const blue = Math.floor(Math.random() * 255)
                const alpha = 0.5

                if(red == 255 && blue == 255 && green == 255) {
                    return this.generateRandomColor()
                }

                return `rgba(${red}, ${green}, ${blue}, ${alpha})`
            },

            generateRandomColorForEachCluster(numberOfCluster) {
                let colors = []
                for(let index = 0; index < numberOfCluster; index++) {
                    colors.push(this.generateRandomColor())
                }

                return colors
            },

            updateStyleOfMarker(resultOfKmeans) {
                const sources = this.markerLayer.getSource()
                const clusters = resultOfKmeans.clusters
                const colors = this.generateRandomColorForEachCluster(this.numberOfCluster)

                clusters.forEach( (item, index) => {

                    const customStyle = new Style({
                            image: new Circle({
                                fill: new Fill({
                                    color: colors[item]
                                }),
                                stroke: new Stroke({
                                    color: 'black',
                                    width: 1,
                                }),
                                radius: 5, 
                            }),
                    })

                    const feature = sources.getFeatures()[index]
                    feature.setStyle(customStyle)

                })
            },
            clear() {
                this.markerLayer.getSource().clear()
            }
        }
    }
  </script>
  