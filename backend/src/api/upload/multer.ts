import multer from 'multer'
import path from 'path'

const storageEngine = multer.diskStorage({
    destination: process.env.MULTER_DESTINATION,
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`)
    }
})

const checkFileType = (file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const fileTypes = /jpeg|jpg|png|svg/

    const extName = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase())

    const mimeType = fileTypes.test(file.mimetype)

    if(mimeType && extName) {
        return cb(null, true)
    }
    return cb(new Error("Error: invalid file extension!"))
}

const checkGeoJsonFileType = (file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const fileTypes = /geojson/

    const extName = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase())

    if(extName) {
        return cb(null, true)
    }
    return cb(new Error("Error: invalid file extension!"))
}

const upload = multer({
    storage: storageEngine,
    limits: { fileSize: parseInt(process.env.MULTER_FILE_SIZE_LIMIT!) },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb)
    }
})

const geoJsonUpload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: parseInt(process.env.MULTER_FILE_SIZE_LIMIT!) },
    fileFilter: (req, file, cb) => {
        checkGeoJsonFileType(file, cb)
    }
})


export { upload, geoJsonUpload }