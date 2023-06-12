import { createWebHistory, createRouter } from "vue-router"
import MainPage from '@/views/MainPage.vue'
import UploadPage from '@/views/UploadPage.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: MainPage
    }, {
        path: '/upload',
        name: 'Upload',
        component: UploadPage
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router