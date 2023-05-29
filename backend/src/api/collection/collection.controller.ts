import e, { Request, Response } from 'express'
import { query } from '../../db/index'

const createCollection = async (req: Request, res: Response, next: any) => {
    console.log('Creating a new collection...')
    const nameCollection = req.body.name
    const descCollection = req.body.desc
    const timestamp = Date.now()

    query(`INSERT INTO 
        ${process.env.POSTGRES_COLLECTIONS_TABLE!} 
            (${process.env.POSTGRES_COLLECTIONS_TABLE_NAME!}, ${process.env.POSTGRES_COLLECTIONS_TABLE_DESC!}, ${process.env.POSTGRES_COLLECTIONS_TABLE_TIMESTAMP!}) 
            VALUES ($1, $2, to_timestamp($3))
            RETURNING ${process.env.POSTGRES_COLLECTIONS_TABLE_ID!}`, [nameCollection, descCollection, timestamp], (err, result) => {
                if(err) {
                    console.log(err)
                    return
                }
                console.log(result)
                if(req.file) {
                    const filename = req.file.filename
                    const lat = parseFloat(req.body.lat)
                    const lon = parseFloat(req.body.lon)
                    const collection_id = result.rows[0].collection_id
                    query(`INSERT INTO
                    ${process.env.POSTGRES_PHOTOS_TABLE!}
                    (${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK!}, ${process.env.POSTGRES_PHOTOS_TABLE_FILENAME!}, ${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION!}, ${process.env.POSTGRES_PHOTOS_TABLE_TIMESTAMP!})
                    VALUES ($1, $2, POINT($3, $4), to_timestamp($5))
                    RETURNING ${process.env.POSTGRES_PHOTOS_TABLE_ID!};`, [collection_id, filename, lat, lon, timestamp], (err, result) => {
                        if(err) {
                            console.log(err)
                            return
                        }
                        console.log(result)
                        console.log('test')
                    })
                }
            })
    console.log(req.body)
    console.log(req.file)
}

export {
    createCollection
}