import { createWebHistory, createRouter } from "vue-router"

import MainPage from '@/views/MainPage.vue'
import UploadPage from '@/views/UploadPage.vue'
import GeoJson from '@/views/Geojson.vue'
import GeoJsonFilter from '@/views/GeoJsonFilter.vue'
import KmeansPage from '@/views/Kmeans.vue'
import HeatMapView from '@/views/HeatMapView.vue'
import GalleryPage from '@/views/GalleryPage.vue'
import GeoJsonGallery from '@/views/GeoJsonGallery.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: MainPage
    }, {
        path: '/upload',
        name: 'Upload',
        component: UploadPage
    }, {
        path: '/geojson',
        name: 'GeoJson',
        component: GeoJson
    }, {
        path: '/geojsonFilter',
        name: 'GeoJsonFilter',
        component: GeoJsonFilter
    }, {
        path: '/kmeans',
        name: 'kmeans',
        component: KmeansPage
    }, {
        path: '/heatmap',
        name: 'heatmap',
        component: HeatMapView
    }, {
        path: '/gallery',
        name: 'gallery',
        component: GalleryPage
    }, {
        path: '/geoGsonGallery',
        name: 'geoGsonGallery',
        component: GeoJsonGallery
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router