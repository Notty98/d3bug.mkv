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

    export default {
        name: 'MainMapContainer',
        components: {},
        props: {
            geojson: {
                type: Object,
                default: null
            },
            geoJsonFiles: [],
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
                console.log('click')
                console.log(e)
            })

            // add geojson boundaries
            if(this.geojson) {
                console.log(this.geojson)

                /*const geoJsonSource = new VectorSource({
                    features: new GeoJSON().readFeatures(this.geojson)
                })*/
                const features = new GeoJSON().readFeatures(this.geojson);
                this.geoJsonSource = new VectorSource({
                    features: features,
                });

                // Transform the coordinates to match the map's projection
                this.geoJsonSource.forEachFeature((feature) => {
                    const geometry = feature.getGeometry();
                    geometry.transform('EPSG:4326', 'EPSG:3857');
                });

                const geoJsonVector = new VectorLayer({
                    source: this.geoJsonSource,
                    style: new Style({
                        stroke: new Stroke({
                            color: 'red',
                            width: 2
                        }),
                        fill: new Fill({
                            color: 'rgba(255, 0, 0, 0.1)'
                        })
                    })
                })
                map.addLayer(geoJsonVector)
                // Fit the view to both the base map and the GeoJSON boundaries
                /*const extent = geoJsonSource.getExtent();
                const padding = [100, 100, 100, 100]; // Adjust padding as needed
                map.getView().fit(extent, {
                    padding
                });*/
            }
        }
    }
</script>