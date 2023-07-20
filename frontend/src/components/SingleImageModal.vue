<template>
    <BModal v-model="modal">
        <!--<img crossorigin="anonymous" :src="src" @load="updateWidth()" :width="width" :height="height" style="object-fit: fill;" /> -->
        <!--<img class="singleImage" crossorigin="anonymous" :src="src" :width="width" :height="height" /> -->
        <img class="singleImage" crossorigin="anonymous" :src="src" /> 
    </BModal>
</template>

<script>

    import { currentUrl } from '@/services/services'

    export default {
        name: 'SingleImageModal',
        components: {},
        props: {},
        data() {
            return {
                modal: false,
                src: "",
            }
        },
        mounted() {
            
        },
        methods: {
            showModal() {
                this.modal = true
            },
            showImage(filename) {
                this.src = `http://${currentUrl}/resources/${filename}`
                this.showModal()
            },
        }
    }
</script>

<style>
    .singleImage {
        width: 100%;
        height: 100%;
    }
</style>