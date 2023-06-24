import express from 'express'

import { router as collectionRouter } from './collection/collection.routes'
import { router as photoRouter } from './photo/photo.routes'
import { router as geoJsonRouter } from './geojson/geojson.routes'

const router = express.Router()

router.use('/collections', collectionRouter)
router.use('/photos', photoRouter)
router.use('/geojsons', geoJsonRouter)

export { router }