import express from 'express'
import { upload } from '../upload/multer'
import { getPhoto, getPhotos } from './photo.controller'

const router = express.Router()

router.get('/:id', getPhoto)

router.get('/', getPhotos)

export { router }