<template>
    <div>
        <b-navbar type="dark" variant="dark">
            <b-navbar-nav>
                <b-nav-item href="/">Home</b-nav-item>
                <b-nav-item href="/upload">Upload</b-nav-item>
                <b-nav-item href="/geojson">Geojson</b-nav-item>
                <b-nav-item href="/geojsonFilter">Geojson Filter</b-nav-item>
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