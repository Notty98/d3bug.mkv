<template>
    <div ref="map-heatmap" style="width: 100%; height: 100%;"></div>
</template>

<script>
    import View from 'ol/View'
    import Map from 'ol/Map'
    import TileLayer from 'ol/layer/Tile'
    import { OSM, Vector as VectorSource } from 'ol/source'
    import { Heatmap } from 'ol/layer'


    import 'ol/ol.css'
    import { getAllPhotos } from '../services/services'

    import Feature from 'ol/Feature'
    import { Point } from 'ol/geom'

    import { transform } from 'ol/proj'


    export default {
        name: 'HeatMapComponent',
        components: {},
        props: {
        },
        data() {
            return {
                map: null,
                heatMapLayer: null,
            }
        },
        mounted() {
            const map = new Map({
                target: this.$refs['map-heatmap'],
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
            this.heatMapLayer = new Heatmap({
                source: new VectorSource(),
                blur: 10,
                radius: 10
            })
            map.addLayer(this.heatMapLayer)

            this.map = map


            getAllPhotos().then((data) => {
                    this.addMarkerToMap(data)
            })
        },
        methods: {
            addMarkerToMap(data) {
                this.clear()
                let heatmapSource = this.heatMapLayer.getSource()
                for(const photo of data.data) {
                    const coordinates = photo.photo_position

                    const transformedCoordinates = transform([coordinates.x, coordinates.y], 'EPSG:4326', 'EPSG:3857');

                    const markerFeature = new Feature({
                        geometry: new Point(transformedCoordinates)
                    })
                    heatmapSource.addFeature(markerFeature)
                }
                this.heatMapLayer.setSource(heatmapSource)
            },
            clear() {
                this.heatMapLayer.getSource().clear()
            }
        },
    }
</script>