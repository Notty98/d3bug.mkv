import { Request, Response } from 'express'
import { query } from '../../db/index'

const createCollection = async (req: Request, res: Response, next: any) => {
    console.log('Creating a new collection...')
    const nameCollection = req.body.name
    const descCollection = req.body.desc
    const timestamp = Date.now()

    try {
        const collectionResult = await query(`
            INSERT INTO ${process.env.POSTGRES_COLLECTIONS_TABLE!} 
            (${process.env.POSTGRES_COLLECTIONS_TABLE_NAME!}, ${process.env.POSTGRES_COLLECTIONS_TABLE_DESC!}, ${process.env.POSTGRES_COLLECTIONS_TABLE_TIMESTAMP!}) 
            VALUES 
            ($1, $2, to_timestamp($3))
            RETURNING ${process.env.POSTGRES_COLLECTIONS_TABLE_ID!}`, [nameCollection, descCollection, timestamp])
        
        const collection_id = collectionResult.rows[0].collection_id

        if(req.file) {
            const filename = req.file.filename
            const lat = parseFloat(req.body.lat)
            const lon = parseFloat(req.body.lon)

            const photoResult = await query(`
                INSERT INTO ${process.env.POSTGRES_PHOTOS_TABLE!}
                (${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK!}, ${process.env.POSTGRES_PHOTOS_TABLE_FILENAME!}, ${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION!}, ${process.env.POSTGRES_PHOTOS_TABLE_TIMESTAMP!})
                VALUES 
                ($1, $2, POINT($3, $4), to_timestamp($5))
                RETURNING ${process.env.POSTGRES_PHOTOS_TABLE_ID!};
            `, [collection_id, filename, lat, lon, timestamp])

            return res.status(201).json({ photoId: photoResult.rows[0].photo_id, collectionId: collection_id})
        }

        return res.status(201).json({ collectionId: collection_id })

    } catch (err) {
        return next(err)
    }
}

const getCollections = async (req: Request, res: Response, next: any) => {
    console.log('get collections')

    try {
        const result = await query(`
            SELECT * FROM ${process.env.POSTGRES_COLLECTIONS_TABLE!};`, [])
        res.status(200).json({ data: result.rows, length: result.rowCount })
    } catch (err) {
        return next(err)
    }
}

const addPhoto = async (req: Request, res: Response, next: any) => {
    console.log('add a photo to a collection')

    if(!req.file) {
        return res.status(400).json({ message: 'bad request' })
    }
    
    const timestamp = Date.now()
    const filename = req.file.filename
    const lat = parseFloat(req.body.lat)
    const lon = parseFloat(req.body.lon)
    const collectionId = parseInt(req.params.collectionId)

    try {

        const photoResult = await query(`
                INSERT INTO ${process.env.POSTGRES_PHOTOS_TABLE!}
                (${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK!}, ${process.env.POSTGRES_PHOTOS_TABLE_FILENAME!}, ${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION!}, ${process.env.POSTGRES_PHOTOS_TABLE_TIMESTAMP!})
                VALUES 
                ($1, $2, POINT($3, $4), to_timestamp($5))
                RETURNING ${process.env.POSTGRES_PHOTOS_TABLE_ID!};
        `, [collectionId, filename, lat, lon, timestamp])

        return res.status(201).json({ photoId: photoResult.rows[0].photo_id })
    } catch (err) {
        return next(err)
    }
}

export {
    createCollection,
    addPhoto,
    getCollections
}


/*, (err, result) => {
                if(err) {
                    console.log(err)
                    return
                }
                console.log(result)
                
            }
            
            select photo_id, collection, photo_position, 
	ST_DistanceSphere(photo_position::geometry,
         ST_MakePoint(40.689202777778,-74.044219444444)::geometry) as distance
from photos
order by distance
limit 10
            
            */