import express from 'express'
import { getPhoto, getPhotos, getAll } from './photo.controller'

const router = express.Router()

router.get('/all', getAll)

router.get('/:id', getPhoto)

router.get('/', getPhotos)

export { router }