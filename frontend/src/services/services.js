import axios from 'axios'

export const getCollections = async () => {
    try {
        const collections = await axios.get(`http://localhost:9090/api/collections`)
        return collections.data
    } catch (err) {
        console.log(err)
    }
}

export const createCollection = async (form) => {
    try {
        const response = await axios.post(`http://localhost:9090/api/collections`, form, {
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
        const response = await axios.post(`http://localhost:9090/api/collections/${collectionId}`, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    } catch (err) {
        console.log(err)
    }
}