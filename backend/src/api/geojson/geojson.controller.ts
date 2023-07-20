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

const removeAllGeoJsons = async (req: Request, res: Response, next: any) => {
    console.log(`Removing ALL GeoJsons`)
    try {

        const result = await query(`
            DELETE FROM ${process.env.POSTGRES_GEOJSON_TABLE!}
            RETURNING ${process.env.POSTGRES_GEOJSON_TABLE_ID!};
        `, [])

        return res.status(200).json({ data: result.rows, length: result.rowCount })
    } catch (err) {
        return next(err)
    }
}

const removeGeoJsonById = async (req: Request, res: Response, next: any) => {
    console.log(`Removing GeoJson with id`)
    try {
        const id = req.params.id

        if(!id) {
            return res.status(400).json({ message: 'missing id' })
        }

        const result = await query(`
            DELETE FROM ${process.env.POSTGRES_GEOJSON_TABLE!}
            WHERE ${process.env.POSTGRES_GEOJSON_TABLE_ID!} = $1
            RETURNING ${process.env.POSTGRES_GEOJSON_TABLE_ID!};
        `, [id])

        return res.status(200).json({ data: result.rows, length: result.rowCount })
    } catch (err) {
        return next(err)
    }
}

export {
    addGeoJson,
    getAllGeoJson,
    removeGeoJsonById,
    removeAllGeoJsons
}