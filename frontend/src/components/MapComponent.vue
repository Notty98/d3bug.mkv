<template>
    <div ref="map-root" style="width: 100%; height: 100%;"></div>
</template>

<script>
    import View from 'ol/View'
    import Map from 'ol/Map'
    import TileLayer from 'ol/layer/Tile'
    import { OSM, Vector as VectorSource } from 'ol/source'
    import { Vector as VectorLayer } from 'ol/layer'

    import 'ol/ol.css'
    import Feature from 'ol/Feature'
    import { Point } from 'ol/geom'
    import { toLonLat } from 'ol/proj'

    export default {
        name: 'MapContainer',
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
            const markerLayer = new VectorLayer({
                source: new VectorSource(),
            })
            map.addLayer(markerLayer)

            map.on('click', (e) => {
                const markerSource = markerLayer.getSource()
                const coordinate = e.coordinate
                const latlon = toLonLat(coordinate)
                console.log(latlon)

                const latitude = latlon[1]
                const longitude = latlon[0]

                this.$emit('update:latitude', latitude)
                this.$emit('update:longitude', longitude)

                const markerFeature = new Feature({
                    geometry: new Point(coordinate)
                })
                markerSource.addFeature(markerFeature)
            })
        }
    }
</script>