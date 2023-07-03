<template>
    <div ref="map-root" style="width: 100%; height: 100%;"></div>
</template>

<script>
    import chroma from "chroma-js"
    import View from 'ol/View'
    import Map from 'ol/Map'
    import TileLayer from 'ol/layer/Tile'
    import { OSM, Vector as VectorSource } from 'ol/source'
    import { Vector as VectorLayer } from 'ol/layer'
    import { GeoJSON } from 'ol/format'

    import Style from 'ol/style/Style'
    import { Fill,  Stroke } from 'ol/style'
    import { Icon } from 'ol/style'

    import 'ol/ol.css'
    import { getGeoJsons, getAllPhotos } from '../services/services'

    import Feature from 'ol/Feature'
    import { Point } from 'ol/geom'

    import { transform } from 'ol/proj'

    import { getMapFromStorage } from '../storage/localstorage'

    export default {
        name: 'MainMapContainer',
        components: {},
        props: {
            latitude: {
                type: Number,
                default: null
            },
            longitude: {
                type: Number,
                default: null
            }
        },
        data() {
            return {
                geojson: [],
                map: null,
                markerLayer: null,
                selectedFeatures: null,
                geoJsonLayer: null
            }
        },
        created() {
            this.selectedFeatures = getMapFromStorage()
            console.log(this.selectedFeatures)
        },
        mounted() {
            const map = new Map({
                target: this.$refs['map-root'],
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
            // handle click
            this.markerLayer = new VectorLayer({
                source: new VectorSource(),
                style: new Style({
                    image: new Icon({
                        scale: 0.5,
                        src: require('@/assets/marker.png')
                    })
                })
            })
            map.addLayer(this.markerLayer)

            /*getAllPhotos().then((data) => {
                this.addMarkerToMap(data)
            })*/

            /*map.on('click', (e) => {
                console.log('click')
                console.log(e)
            })*/
            this.map = map


            getGeoJsons().then((data) => {
                for(const item of data.data) {
                    const jsonGeoJson = JSON.parse(item['geojson_geom'])
                    this.geojson.push(jsonGeoJson)
                }
                this.setGeoJsonLayer()

                getAllPhotos().then((data) => {
                    this.addMarkerToMap(data)
                })
            })
        },
        methods: {
            getMapFromStorage() {
                const stringMap = localStorage.getItem('selectedFeatures')
                if(!stringMap) {
                    return new Map()
                }
                return new Map(JSON.parse(stringMap))
            },
            setGeoJsonLayer() {
                const features = []

                // Iterate over each GeoJSON object in the array
                this.geojson.forEach((geojson, geoJsonIndex) => {
                    // Read features from each GeoJSON object
                    const geojsonFeatures = new GeoJSON().readFeatures(geojson)

                    let filteredFeatures = geojsonFeatures.filter((feature, featureIndex) => {
                        const key = geoJsonIndex + '-' + featureIndex
                        return this.selectedFeatures.get(key) 
                    })

                    // Transform the coordinates to match the map's projection
                    filteredFeatures.forEach((feature) => {
                        const geometry = feature.getGeometry();
                        geometry.transform('EPSG:4326', 'EPSG:3857')
                    })
                    
                    // Add the features to the array
                    features.push(...filteredFeatures)

                })

                const geoJsonSource = new VectorSource({
                    features: features,
                })

                this.geoJsonLayer = new VectorLayer({
                    source: geoJsonSource,
                    style: new Style()
                    /*style: new Style({
                        stroke: new Stroke({
                            color: 'red',
                            width: 2,
                        }),
                        fill: new Fill({
                            color: 'rgba(255, 0, 0, 0.1)',
                        }),
                    }),*/
                })
                this.map.addLayer(this.geoJsonLayer)
            },
            addMarkerToMap(data) {
                let markerSource = this.markerLayer.getSource()

                let geoJsonSource = this.geoJsonLayer.getSource()
                let features = geoJsonSource.getFeatures()

                for(const photo of data.data) {
                    const coordinates = photo.photo_position

                    const transformedCoordinates = transform([coordinates.y, coordinates.x], 'EPSG:4326', 'EPSG:3857');

                    const markerFeature = new Feature({
                        geometry: new Point(transformedCoordinates)
                    })

                    

                    for(let index = 0; index < features.length; index++) {
                        const geoJsonGeometry = features[index].getGeometry()
                        console.log(features[index])
                        const isInside = geoJsonGeometry.intersectsCoordinate(transformedCoordinates)
                        if(isInside) {
                            let oldValue = (!features[index].get('photoCount')) ? 0 : features[index].get('photoCount')
                            features[index].set('photoCount', (oldValue + 1))
                            markerSource.addFeature(markerFeature)
                            break
                        }
                    }
                }

                this.markerLayer.setSource(markerSource)

                this.setStyleToGeoJson()
            },
            setStyleToGeoJson() {
                this.geoJsonLayer.setStyle(this.styleFunction)
            },
            styleFunction(feature) {
                const photoCount = feature.get('photoCount') || 0
                const colorScale = chroma.scale(['yellow', 'red']).domain([0, 10]); // Esempio di scala di colori
                const color = colorScale(photoCount).alpha(0.1).hex();

                return new Style({
                    fill: new Fill({ color }),
                    stroke: new Stroke({ color: '#000000', width: 1 }),
                });
            }
        },
    }
</script>