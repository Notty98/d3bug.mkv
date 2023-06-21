import { createWebHistory, createRouter } from "vue-router"
import MainPage from '@/views/MainPage.vue'
import UploadPage from '@/views/UploadPage.vue'
import GeoJson from '@/views/Geojson.vue'

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
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router