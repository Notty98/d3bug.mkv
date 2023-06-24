<template>
    <div ref="map-root" style="width: 100%; height: 100%;"></div>
</template>

<script>
    import View from 'ol/View'
    import Map from 'ol/Map'
    import TileLayer from 'ol/layer/Tile'
    import { OSM, Vector as VectorSource } from 'ol/source'
    import { Vector as VectorLayer } from 'ol/layer'
    import { GeoJSON } from 'ol/format'

    import Style from 'ol/style/Style'
    import { Fill,  Stroke } from 'ol/style'

    import 'ol/ol.css'
    import { getGeoJsons } from '../services/services'


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
            }
        },
        mounted() {
            getGeoJsons().then((data) => {
                for(const item of data.data) {
                    const jsonGeoJson = JSON.parse(item['geojson_geom'])
                    this.geojson.push(jsonGeoJson)
                }
                this.setGeoJsonLayer()
            })

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
            const markerLayer = new VectorLayer({
                source: new VectorSource(),
            })
            map.addLayer(markerLayer)

            map.on('click', (e) => {
                console.log('click')
                console.log(e)
            })
            this.map = map
        },
        methods: {
            setGeoJsonLayer() {
                const features = []

                // Iterate over each GeoJSON object in the array
                this.geojson.forEach((geojson) => {
                    // Read features from each GeoJSON object
                    const geojsonFeatures = new GeoJSON().readFeatures(geojson)

                    // Transform the coordinates to match the map's projection
                    geojsonFeatures.forEach((feature) => {
                        const geometry = feature.getGeometry();
                        geometry.transform('EPSG:4326', 'EPSG:3857');
                    })

                    // Add the features to the array
                    features.push(...geojsonFeatures)
                })

                const geoJsonSource = new VectorSource({
                    features: features,
                })

                const geoJsonVector = new VectorLayer({
                    source: geoJsonSource,
                    style: new Style({
                        stroke: new Stroke({
                            color: 'red',
                            width: 2,
                        }),
                        fill: new Fill({
                            color: 'rgba(255, 0, 0, 0.1)',
                        }),
                    }),
                })
                this.map.addLayer(geoJsonVector)
            }
        }
    }
</script>