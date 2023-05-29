import express from 'express'

import { router as collectionRouter } from './collection/collection.routes'

const router = express.Router()

router.use('/collections', collectionRouter)

export { router }