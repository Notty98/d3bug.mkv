<template>
    <div>
        <b-navbar type="dark" variant="dark">
            <b-navbar-nav>
                <b-nav-item href="/">Home</b-nav-item>
                <b-nav-item href="/upload">Upload</b-nav-item>
                <b-nav-item href="/geojson">Geojson</b-nav-item>
                <b-nav-item href="/geojsonFilter">Geojson Filter</b-nav-item>
                <b-nav-item href="/kmeans" >KMeans</b-nav-item>
                <b-nav-item href="/dbscan" >DBScan</b-nav-item>
                <b-nav-item href="/heatmap">HeatMap</b-nav-item>
                <b-nav-item href="/gallery">Gallery</b-nav-item>
                <b-nav-item href="/geoGsonGallery">GeoJson Gallery</b-nav-item>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        name: 'NavBar',
        components: {},
        props: {},
        mounted() {
            
        }
    }
</script>