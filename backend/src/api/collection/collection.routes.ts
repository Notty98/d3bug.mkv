import express from 'express'
import { addPhoto, createCollection, getCollections } from './collection.controller'
import { upload } from '../upload/multer'

const router = express.Router()

router.post('/', upload.single(process.env.MULTER_FIELD_NAME!), createCollection)
router.post('/:collectionId', upload.single(process.env.MULTER_FIELD_NAME!), addPhoto)
router.get('/', getCollections)

export { router }