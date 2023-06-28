import express from 'express'
import { addGeoJson, getAllGeoJson } from './geojson.controller'
import { geoJsonUpload } from '../upload/multer'

const router = express.Router()

router.post('/', geoJsonUpload.single(process.env.MULTER_FIELD_NAME_GEOJSON!), addGeoJson)
router.get('/', getAllGeoJson)

export { router }