import { query } from './index'

const seedCollection = async () => {
    const timestamp = Date.now()

    await query(`
        INSERT INTO ${process.env.POSTGRES_COLLECTIONS_TABLE!}
        (${process.env.POSTGRES_COLLECTIONS_TABLE_ID!}, ${process.env.POSTGRES_COLLECTIONS_TABLE_NAME!}, ${process.env.POSTGRES_COLLECTIONS_TABLE_DESC!}, ${process.env.POSTGRES_COLLECTIONS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, $3, to_timestamp($4))
    `, [1, 'Un giorno a Reggio Emilia', 'Centro città', timestamp])

    await query(`
        INSERT INTO ${process.env.POSTGRES_COLLECTIONS_TABLE!}
        (${process.env.POSTGRES_COLLECTIONS_TABLE_ID!}, ${process.env.POSTGRES_COLLECTIONS_TABLE_NAME!}, ${process.env.POSTGRES_COLLECTIONS_TABLE_DESC!}, ${process.env.POSTGRES_COLLECTIONS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, $3, to_timestamp($4))
    `, [2, 'Visita gastronomica a Rubiera', 'Uno dei borghi più belli d\'Italia', timestamp])

    await query(`
        INSERT INTO ${process.env.POSTGRES_COLLECTIONS_TABLE!}
        (${process.env.POSTGRES_COLLECTIONS_TABLE_ID!}, ${process.env.POSTGRES_COLLECTIONS_TABLE_NAME!}, ${process.env.POSTGRES_COLLECTIONS_TABLE_DESC!}, ${process.env.POSTGRES_COLLECTIONS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, $3, to_timestamp($4))
    `, [3, 'Weekend a Parigi', 'no comment', timestamp])

}

const seedPhotos = async () => {
    const timestamp = Date.now()

    // collection 'Un giorno a Reggio Emilia' -> ID 1
    await query(`
        INSERT INTO ${process.env.POSTGRES_PHOTOS_TABLE!}
        (${process.env.POSTGRES_PHOTOS_TABLE_ID!}, ${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK!}, ${process.env.POSTGRES_PHOTOS_TABLE_FILENAME!}, ${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION!}, ${process.env.POSTGRES_PHOTOS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, $3, POINT($4, $5), to_timestamp($6))`, [1, 1, 'LibrerieArco-1689437467764.jpeg', 10.629930, 44.698978, timestamp])

    await query(`
        INSERT INTO ${process.env.POSTGRES_PHOTOS_TABLE!}
        (${process.env.POSTGRES_PHOTOS_TABLE_ID!}, ${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK!}, ${process.env.POSTGRES_PHOTOS_TABLE_FILENAME!}, ${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION!}, ${process.env.POSTGRES_PHOTOS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, $3, POINT($4, $5), to_timestamp($6))`, [2, 1, 'Prampolini-1689437455523.jpg', 10.630310, 44.697770, timestamp])
    
    await query(`
        INSERT INTO ${process.env.POSTGRES_PHOTOS_TABLE!}
        (${process.env.POSTGRES_PHOTOS_TABLE_ID!}, ${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK!}, ${process.env.POSTGRES_PHOTOS_TABLE_FILENAME!}, ${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION!}, ${process.env.POSTGRES_PHOTOS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, $3, POINT($4, $5), to_timestamp($6))`, [3, 1, 'salaDelTricolore-1689437440715.jpg', 10.630210, 44.697420, timestamp])

    await query(`
        INSERT INTO ${process.env.POSTGRES_PHOTOS_TABLE!}
        (${process.env.POSTGRES_PHOTOS_TABLE_ID!}, ${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK!}, ${process.env.POSTGRES_PHOTOS_TABLE_FILENAME!}, ${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION!}, ${process.env.POSTGRES_PHOTOS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, $3, POINT($4, $5), to_timestamp($6))`, [4, 1, 'ValliTheatre-1689437047504.jpeg', 10.631160, 44.699500, timestamp])

    await query(`
        INSERT INTO ${process.env.POSTGRES_PHOTOS_TABLE!}
        (${process.env.POSTGRES_PHOTOS_TABLE_ID!}, ${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK!}, ${process.env.POSTGRES_PHOTOS_TABLE_FILENAME!}, ${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION!}, ${process.env.POSTGRES_PHOTOS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, $3, POINT($4, $5), to_timestamp($6))`, [5, 1, 'ValliTheatre-1689437319368.jpg', 10.631148, 44.699842, timestamp])

    // collection 'Visita gastronomica a Rubiera' -> ID 2

    await query(`
        INSERT INTO ${process.env.POSTGRES_PHOTOS_TABLE!}
        (${process.env.POSTGRES_PHOTOS_TABLE_ID!}, ${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK!}, ${process.env.POSTGRES_PHOTOS_TABLE_FILENAME!}, ${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION!}, ${process.env.POSTGRES_PHOTOS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, $3, POINT($4, $5), to_timestamp($6))`, [6, 2, 'Arnaldo-1689532233147.jpg', 10.781910, 44.653040, timestamp])

    await query(`
        INSERT INTO ${process.env.POSTGRES_PHOTOS_TABLE!}
        (${process.env.POSTGRES_PHOTOS_TABLE_ID!}, ${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK!}, ${process.env.POSTGRES_PHOTOS_TABLE_FILENAME!}, ${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION!}, ${process.env.POSTGRES_PHOTOS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, $3, POINT($4, $5), to_timestamp($6))`, [7, 2, 'OsteriaDelViandante-1689532210909.jpg', 10.781653, 44.652832, timestamp])

    // collection 'Weekend a Parigi' -> ID 3

    await query(`
        INSERT INTO ${process.env.POSTGRES_PHOTOS_TABLE!}
        (${process.env.POSTGRES_PHOTOS_TABLE_ID!}, ${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK!}, ${process.env.POSTGRES_PHOTOS_TABLE_FILENAME!}, ${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION!}, ${process.env.POSTGRES_PHOTOS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, $3, POINT($4, $5), to_timestamp($6))`, [8, 3, 'LouvreMuseum-1689535930524.jpeg', 2.343437, 48.862199, timestamp])

    await query(`
        INSERT INTO ${process.env.POSTGRES_PHOTOS_TABLE!}
        (${process.env.POSTGRES_PHOTOS_TABLE_ID!}, ${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK!}, ${process.env.POSTGRES_PHOTOS_TABLE_FILENAME!}, ${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION!}, ${process.env.POSTGRES_PHOTOS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, $3, POINT($4, $5), to_timestamp($6))`, [9, 3, 'PereLachaiseCemetery-1689535956917.jpeg', 2.391067, 48.859249, timestamp])

}


// insert in the tables the seeds value
const seed = async () => {
    try {
        const collection = await query(`SELECT * FROM ${process.env.POSTGRES_COLLECTIONS_TABLE!}`, [])

        if(collection.rowCount == 0) {
            console.log('starting to seed the collection table')
            await seedCollection()
        }
        const photo = await query(`SELECT * FROM ${process.env.POSTGRES_PHOTOS_TABLE!}`, [])

        if(photo.rowCount == 0) {
            console.log('starting to seed the photo table')
            await seedPhotos()
        }
    } catch (err) {
        console.log(err)
    }

}

export {
    seed
}