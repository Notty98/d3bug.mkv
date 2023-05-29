import express from 'express'
import { createCollection } from './collection.controller'
import { upload } from '../upload/multer'

const router = express.Router()

router.post('/', upload.single(process.env.MULTER_FIELD_NAME!), createCollection)

export { router }