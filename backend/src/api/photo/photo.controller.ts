import { Request, Response } from "express"
import { query } from "../../db/index"

const getPhoto = async (req: Request, res: Response, next : any) => {
    console.log('Returning photo metadata')

    const id = req.params.id

    try {
        const result = await query(`
            SELECT * from ${process.env.POSTGRES_PHOTOS_TABLE!}
            WHERE ${process.env.POSTGRES_PHOTOS_TABLE_ID!} = $1`, [id])
        return res.status(200).json({ data: result.rows, length: result.rowCount })
    } catch (err) {
        return next(err)
    }

}

const getAllPhotosofCollection = async (req: Request, res: Response, next: any) => {
    console.log('getAll photos of collection')

    try {
        const collectionId = req.params.collectionId

        const result = await query(`
            SELECT *
            FROM ${process.env.POSTGRES_PHOTOS_TABLE}
            WHERE ${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK} = $1;`, [collectionId])

        return res.status(200).json({ data: result.rows, length: result.rowCount })

    } catch (err) {
        return next(err)
    }
 }

const getAll = async (req: Request, res: Response, next: any) => {
    console.log('getAll photos')

    try {
        const result = await query(`
            SELECT *
            FROM ${process.env.POSTGRES_PHOTOS_TABLE};`, [])

        return res.status(200).json({ data: result.rows, length: result.rowCount })

    } catch (err) {
        return next(err)
    }
}

const getPhotos = async (req: Request, res: Response, next: any) => {
    console.log('searching the N nearest photos')

    if(!req.query.lat || !req.query.lon || !req.query.n) {
        return res.status(400).json({ error: 'bad request' })
    }

    const n = req.query.n
    const lat = req.query.lat as string
    const lon = req.query.lon as string

    try {
        const result = await query(`
            SELECT *, ST_DistanceSphere(${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION}::geometry, ST_MakePoint(${parseFloat(lon)}, ${parseFloat(lat)})::geometry) as ${process.env.POSTGRES_PHOTOS_TABLE_QUERY_DISTANCE_FIELD!}
            FROM ${process.env.POSTGRES_PHOTOS_TABLE}
            ORDER BY ${process.env.POSTGRES_PHOTOS_TABLE_QUERY_DISTANCE_FIELD!}
            LIMIT ${n};`, 
        [])

        return res.status(200).json({ data: result.rows, length: result.rowCount })

    } catch (err) {
        return next(err)
    }

}

export {
    getPhoto,
    getPhotos,
    getAll,
    getAllPhotosofCollection
}