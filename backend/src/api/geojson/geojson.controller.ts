import { Request, Response } from 'express'
import { query } from '../../db/index'

const addGeoJson = async (req: Request, res: Response, next: any) => {
    console.log('uploading geojson...')
    if(!req.file) {
        return res.status(400).json({ message: 'Bad request'})
    }
    try {
        const name = req.file.originalname
        const geoJsonString = req.file.buffer.toString('utf-8')

        const result = await query(`
            INSERT INTO ${process.env.POSTGRES_GEOJSON_TABLE!}
            (${process.env.POSTGRES_GEOJSON_TABLE_NAME}, ${process.env.POSTGRES_GEOJSON_TABLE_GEOM!})
            VALUES
            ($1, $2)
            RETURNING ${process.env.POSTGRES_GEOJSON_TABLE_ID!};
        `, [name, geoJsonString])

        return res.status(200).json({ geojson_id: result.rows[0].geojson_id })

    } catch (err) {
        return next(err)
    }
}

const getAllGeoJson = async (req: Request, res: Response, next: any) => {
    console.log('Get all geojson...')
    try {
        const result = await query(`
            SELECT * 
            FROM ${process.env.POSTGRES_GEOJSON_TABLE!}
        `, [])

        return res.status(200).json({ data: result.rows, length: result.rowCount })

    } catch (err) {
        return next(err)
    }
}

export {
    addGeoJson,
    getAllGeoJson
}