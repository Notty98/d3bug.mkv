import { createStore } from "vuex"

export default createStore({
    state: {
        geojson: 'hello'
    },
    mutations: {
        setGeoJson(state, geojson) {
            state.geojson = geojson
        }
    },
    actions: {
        setGeoJson({ commit }, geojson) {
            commit('setGeoJson', geojson)
        }
    },
    getters: {

    }
})