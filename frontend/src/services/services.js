import axios from 'axios'

const urls =  {
    production: 'localhost',
    dev: 'localhost:9090'
}


export const getCollections = async () => {
    try {
        const collections = await axios.get(`http://${urls.dev}/api/collections`)
        return collections.data
    } catch (err) {
        console.log(err)
    }
}

export const createCollection = async (form) => {
    try {
        const response = await axios.post(`http://${urls.dev}/api/collections`, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export const addPhotoToCollection = async (form, collectionId) => {
    try {
        const response = await axios.post(`http://${urls.dev}/api/collections/${collectionId}`, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export const getGeoJsons = async () => {
    try {
        const collections = await axios.get(`http://${urls.dev}/api/geojsons`)
        return collections.data
    } catch (err) {
        console.log(err)
    }
}

export const addGeoJson = async (form) => {
    try {
        const collections = await axios.post(`http://${urls.dev}/api/geojsons`, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return collections.data
    } catch (err) {
        console.log(err)
    }
}

export const removeGeojsonById = async (id) => {
    try {
        const collections = await axios.delete(`http://${urls.dev}/api/geojsons/${id}`)
        return collections.data
    } catch (err) {
        console.log(err)
    }
}

export const removeAllGeoJsons = async () => {
    try {
        const collections = await axios.delete(`http://${urls.dev}/api/geojsons/`)
        return collections.data
    } catch (err) {
        console.log(err)
    }
}

export const getAllPhotos = async () => {
    try {
        const collections = await axios.get(`http://${urls.dev}/api/photos/all`)
        return collections.data
    } catch (err) {
        console.log(err)
    }
}