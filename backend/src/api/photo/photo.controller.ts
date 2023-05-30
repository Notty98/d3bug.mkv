import { Request, Response } from "express"
import { query } from "../../db/index"

const getPhoto = async (req: Request, res: Response, next : any) => {
    console.log('Returning photo metadata')

    const id = req.params.id

    try {
        const result = await query(`SELECT * from ${process.env.POSTGRES_PHOTOS_TABLE!}`, [])
        return res.status(200).json({ data: result.rows, length: result.rowCount })
    } catch (err) {
        return next(err)
    }

}

const getPhotos = async (req: Request, res: Response, next: any) => {
    console.log('searching the N nearest photos')

    const n = req.params.n
    const lat = req.params.lat
    const lon = req.params.lon

    try {
        const result = await query(`
            SELECT *, ST_DistanceSphere($1::geometry,
                ST_MakePoint($2,$3)::geometry) as $4
            FROM $5
            ORDER BY $4
            LIMIT $5;`, 
        [process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION, lon, lat, process.env.POSTGRES_PHOTOS_TABLE_QUERY_DISTANCE_FIELD, process.env.POSTGRES_PHOTOS_TABLE, n])

        return res.status(200).json({ data: result.rows, length: result.rowCount })

    } catch (err) {
        return next(err)
    }

}

export {
    getPhoto,
    getPhotos
}