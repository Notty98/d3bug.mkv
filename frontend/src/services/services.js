import axios from 'axios'

const urls =  {
    production: 'localhost',
    dev: 'localhost:9090'
}

export const currentUrl = urls.production


export const getCollections = async () => {
    try {
        const collections = await axios.get(`http://${currentUrl}/api/collections`)
        return collections.data
    } catch (err) {
        console.log(err)
    }
}

export const createCollection = async (form) => {
    try {
        const response = await axios.post(`http://${currentUrl}/api/collections`, form, {
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
        const response = await axios.post(`http://${currentUrl}/api/collections/${collectionId}`, form, {
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
        const collections = await axios.get(`http://${currentUrl}/api/geojsons`)
        return collections.data
    } catch (err) {
        console.log(err)
    }
}

export const addGeoJson = async (form) => {
    try {
        const collections = await axios.post(`http://${currentUrl}/api/geojsons`, form, {
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
        const collections = await axios.delete(`http://${currentUrl}/api/geojsons/${id}`)
        return collections.data
    } catch (err) {
        console.log(err)
    }
}

export const removeAllGeoJsons = async () => {
    try {
        const collections = await axios.delete(`http://${currentUrl}/api/geojsons/`)
        return collections.data
    } catch (err) {
        console.log(err)
    }
}

export const getAllPhotos = async () => {
    try {
        const collections = await axios.get(`http://${currentUrl}/api/photos/all`)
        return collections.data
    } catch (err) {
        console.log(err)
    }
}

export const getAllPhotosOfCollection = async (collectionId) => {
    try {
        const collections = await axios.get(`http://${currentUrl}/api/collections/${collectionId}/photos/`)
        return collections.data
    } catch (err) {
        console.log(err)
    }
}