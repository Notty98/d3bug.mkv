import express from 'express'

import { router as collectionRouter } from './collection/collection.routes'
import { router as photoRouter } from './photo/photo.routes'

const router = express.Router()

router.use('/collections', collectionRouter)
router.use('/photos', photoRouter)

export { router }