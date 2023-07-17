<template>
    <NavBar></NavBar>
    <h1>DBScan</h1>
    <div>
        <BInputGroup prepend="Neighborhood radius" class="mt-3">
            <BFormInput v-model="radius"/>
        </BInputGroup>
        <BInputGroup prepend="Number of points in neighborhood to form a cluster" class="mt-3">
            <BFormInput v-model="numberOfPoint" />
        </BInputGroup> 
        <button @click="event => handleClick(event)">Calculate Hclust</button>
    </div>
    <div ref="map-hclust" style="width: 100%; height: 50%;"></div>
</template>
  
<script>
  
    import NavBar from '../components/NavBar.vue'
    import { getAllPhotos } from '../services/services'
    import { getClusters } from '../dbscan/dbscan'

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
        name: 'DBScanPage',
        props: { },
        data() {
            return {
                numberOfCluster: null,
                markerLayer: null,
                map: null,
                radius: 15000, // 15 KM
                numberOfPoint: 2
            }
        },
        components: {
            NavBar
        },
        mounted() {
            const map = new Map({
                target: this.$refs['map-hclust'],
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
            generateSetNumberOfClusters(max) {
                let set = new Set()

                while(set.size < Math.min(max, this.maxClusters)) {
                    const randomK = 1 + Math.floor(Math.random() * max)
                    set.add(randomK)
                }

                return set
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

                    const results = getClusters(coordinateArray, this.radius, this.numberOfPoint)
                      
                    this.numberOfCluster = results.length

                    console.log(this.numberOfCluster)

                    this.updateStyleOfMarker(results)
                })
                
            },
            
            addMarkerToMap(data) {
                this.clear()
                let markerSource = this.markerLayer.getSource()
                for(const photo of data.data) {
                    const coordinates = photo.photo_position

                    const transformedCoordinates = transform([coordinates.x, coordinates.y], 'EPSG:4326', 'EPSG:3857');

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

            updateStyleOfMarker(resultOfHclust) {
                const sources = this.markerLayer.getSource()
                const clusters = resultOfHclust
                const colors = this.generateRandomColorForEachCluster(this.numberOfCluster)

                clusters.forEach((cluster, indexCluster) => {
                    cluster.forEach(element => {
                        const customStyle = new Style({
                            image: new Circle({
                                fill: new Fill({
                                    color: colors[indexCluster]
                                }),
                                stroke: new Stroke({
                                    color: 'black',
                                    width: 1,
                                }),
                                radius: 5, 
                            }),
                        })

                        const feature = sources.getFeatures()[element]
                        feature.setStyle(customStyle)
                    })
                })
            },
            clear() {
                this.markerLayer.getSource().clear()
            }
        }
    }
  </script>
  