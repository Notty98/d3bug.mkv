import { query } from './index'

let idObject = {
    reggioEmiliaCollection: null,
    rubieraCollection: null,
    parigiCollection: null,
    cagliariCollection: null,
    cyprusCollection: null,
    lilleCollection: null
}

const seedCollection = async () => {
    const timestamp = Date.now()

    const resultFirstQuery = await query(`
        INSERT INTO ${process.env.POSTGRES_COLLECTIONS_TABLE!}
        (${process.env.POSTGRES_COLLECTIONS_TABLE_NAME!}, ${process.env.POSTGRES_COLLECTIONS_TABLE_DESC!}, ${process.env.POSTGRES_COLLECTIONS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, to_timestamp($3))
        RETURNING ${process.env.POSTGRES_COLLECTIONS_TABLE_ID!};
    `, ['Un giorno a Reggio Emilia', 'Centro città', timestamp])

    idObject.reggioEmiliaCollection = resultFirstQuery.rows[0].collection_id

    const resultSecondQuery = await query(`
        INSERT INTO ${process.env.POSTGRES_COLLECTIONS_TABLE!}
        (${process.env.POSTGRES_COLLECTIONS_TABLE_NAME!}, ${process.env.POSTGRES_COLLECTIONS_TABLE_DESC!}, ${process.env.POSTGRES_COLLECTIONS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, to_timestamp($3))
        RETURNING ${process.env.POSTGRES_COLLECTIONS_TABLE_ID!};
    `, ['Visita gastronomica a Rubiera', 'Uno dei borghi più belli d\'Italia', timestamp])

    idObject.rubieraCollection = resultSecondQuery.rows[0].collection_id

    const resultThirdQuery = await query(`
        INSERT INTO ${process.env.POSTGRES_COLLECTIONS_TABLE!}
        (${process.env.POSTGRES_COLLECTIONS_TABLE_NAME!}, ${process.env.POSTGRES_COLLECTIONS_TABLE_DESC!}, ${process.env.POSTGRES_COLLECTIONS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, to_timestamp($3))
        RETURNING ${process.env.POSTGRES_COLLECTIONS_TABLE_ID!};
    `, ['Weekend a Parigi', 'no comment', timestamp])

    idObject.parigiCollection = resultThirdQuery.rows[0].collection_id

    const resultFourthQuery = await query(`
        INSERT INTO ${process.env.POSTGRES_COLLECTIONS_TABLE!}
        (${process.env.POSTGRES_COLLECTIONS_TABLE_NAME!}, ${process.env.POSTGRES_COLLECTIONS_TABLE_DESC!}, ${process.env.POSTGRES_COLLECTIONS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, to_timestamp($3))
        RETURNING ${process.env.POSTGRES_COLLECTIONS_TABLE_ID!};
    `, ['Cagliari - Sardegna', 'cattedrali', timestamp])

    idObject.cagliariCollection = resultFourthQuery.rows[0].collection_id

    const resultFifthQuery = await query(`
        INSERT INTO ${process.env.POSTGRES_COLLECTIONS_TABLE!}
        (${process.env.POSTGRES_COLLECTIONS_TABLE_NAME!}, ${process.env.POSTGRES_COLLECTIONS_TABLE_DESC!}, ${process.env.POSTGRES_COLLECTIONS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, to_timestamp($3))
        RETURNING ${process.env.POSTGRES_COLLECTIONS_TABLE_ID!};
    `, ['Cyprus', 'vacanza al mare', timestamp])

    idObject.cyprusCollection = resultFifthQuery.rows[0].collection_id

    const resultSixthQuery = await query(`
        INSERT INTO ${process.env.POSTGRES_COLLECTIONS_TABLE!}
        (${process.env.POSTGRES_COLLECTIONS_TABLE_NAME!}, ${process.env.POSTGRES_COLLECTIONS_TABLE_DESC!}, ${process.env.POSTGRES_COLLECTIONS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, to_timestamp($3))
        RETURNING ${process.env.POSTGRES_COLLECTIONS_TABLE_ID!};
    `, ['Lille - France', 'church', timestamp])

    idObject.lilleCollection = resultSixthQuery.rows[0].collection_id

}

const seedPhotos = async () => {
    const timestamp = Date.now()

    // collection 'Un giorno a Reggio Emilia' -> ID 1
    await query(`
        INSERT INTO ${process.env.POSTGRES_PHOTOS_TABLE!}
        (${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK!}, ${process.env.POSTGRES_PHOTOS_TABLE_FILENAME!}, ${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION!}, ${process.env.POSTGRES_PHOTOS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, POINT($3, $4), to_timestamp($5))`, [idObject.reggioEmiliaCollection, 'LibrerieArco-1689437467764.jpeg', 10.629930, 44.698978, timestamp])

    await query(`
        INSERT INTO ${process.env.POSTGRES_PHOTOS_TABLE!}
        (${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK!}, ${process.env.POSTGRES_PHOTOS_TABLE_FILENAME!}, ${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION!}, ${process.env.POSTGRES_PHOTOS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, POINT($3, $4), to_timestamp($5))`, [idObject.reggioEmiliaCollection, 'Prampolini-1689437455523.jpg', 10.630310, 44.697770, timestamp])
    
    await query(`
        INSERT INTO ${process.env.POSTGRES_PHOTOS_TABLE!}
        (${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK!}, ${process.env.POSTGRES_PHOTOS_TABLE_FILENAME!}, ${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION!}, ${process.env.POSTGRES_PHOTOS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, POINT($3, $4), to_timestamp($5))`, [idObject.reggioEmiliaCollection, 'salaDelTricolore-1689437440715.jpg', 10.630210, 44.697420, timestamp])

    await query(`
        INSERT INTO ${process.env.POSTGRES_PHOTOS_TABLE!}
        (${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK!}, ${process.env.POSTGRES_PHOTOS_TABLE_FILENAME!}, ${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION!}, ${process.env.POSTGRES_PHOTOS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, POINT($3, $4), to_timestamp($5))`, [idObject.reggioEmiliaCollection, 'ValliTheatre-1689437047504.jpeg', 10.631160, 44.699500, timestamp])

    await query(`
        INSERT INTO ${process.env.POSTGRES_PHOTOS_TABLE!}
        (${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK!}, ${process.env.POSTGRES_PHOTOS_TABLE_FILENAME!}, ${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION!}, ${process.env.POSTGRES_PHOTOS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, POINT($3, $4), to_timestamp($5))`, [idObject.reggioEmiliaCollection, 'ValliTheatre-1689437319368.jpg', 10.631148, 44.699842, timestamp])

    // collection 'Visita gastronomica a Rubiera' -> ID 2

    await query(`
        INSERT INTO ${process.env.POSTGRES_PHOTOS_TABLE!}
        (${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK!}, ${process.env.POSTGRES_PHOTOS_TABLE_FILENAME!}, ${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION!}, ${process.env.POSTGRES_PHOTOS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, POINT($3, $4), to_timestamp($5))`, [idObject.rubieraCollection, 'Arnaldo-1689532233147.jpg', 10.781910, 44.653040, timestamp])

    await query(`
        INSERT INTO ${process.env.POSTGRES_PHOTOS_TABLE!}
        (${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK!}, ${process.env.POSTGRES_PHOTOS_TABLE_FILENAME!}, ${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION!}, ${process.env.POSTGRES_PHOTOS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, POINT($3, $4), to_timestamp($5))`, [idObject.rubieraCollection, 'OsteriaDelViandante-1689532210909.jpg', 10.781653, 44.652832, timestamp])

    // collection 'Weekend a Parigi' -> ID 3

    await query(`
        INSERT INTO ${process.env.POSTGRES_PHOTOS_TABLE!}
        (${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK!}, ${process.env.POSTGRES_PHOTOS_TABLE_FILENAME!}, ${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION!}, ${process.env.POSTGRES_PHOTOS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, POINT($3, $4), to_timestamp($5))`, [idObject.parigiCollection, 'LouvreMuseum-1689535930524.jpeg', 2.343437, 48.862199, timestamp])

    await query(`
        INSERT INTO ${process.env.POSTGRES_PHOTOS_TABLE!}
        (${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK!}, ${process.env.POSTGRES_PHOTOS_TABLE_FILENAME!}, ${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION!}, ${process.env.POSTGRES_PHOTOS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, POINT($3, $4), to_timestamp($5))`, [idObject.parigiCollection, 'PereLachaiseCemetery-1689535956917.jpeg', 2.391067, 48.859249, timestamp])

    // collection 'Cagliari - Sardegna' -> ID 4

    await query(`
        INSERT INTO ${process.env.POSTGRES_PHOTOS_TABLE!}
        (${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK!}, ${process.env.POSTGRES_PHOTOS_TABLE_FILENAME!}, ${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION!}, ${process.env.POSTGRES_PHOTOS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, POINT($3, $4), to_timestamp($5))`, [idObject.cagliariCollection, 'CathedralOfCagliari-1690365467432.jpeg', 9.116750, 39.218980, timestamp])

    await query(`
        INSERT INTO ${process.env.POSTGRES_PHOTOS_TABLE!}
        (${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK!}, ${process.env.POSTGRES_PHOTOS_TABLE_FILENAME!}, ${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION!}, ${process.env.POSTGRES_PHOTOS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, POINT($3, $4), to_timestamp($5))`, [idObject.cagliariCollection, 'BastionSaintRemy-1690365641436.jpg', 9.116740, 39.215570, timestamp])

    // collection 'Cyprus' -> ID 5

    await query(`
        INSERT INTO ${process.env.POSTGRES_PHOTOS_TABLE!}
        (${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK!}, ${process.env.POSTGRES_PHOTOS_TABLE_FILENAME!}, ${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION!}, ${process.env.POSTGRES_PHOTOS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, POINT($3, $4), to_timestamp($5))`, [idObject.cyprusCollection, 'CyprusTombsOfTheKings-1690370019759.jpeg', 32.405466, 34.786240, timestamp])

    await query(`
        INSERT INTO ${process.env.POSTGRES_PHOTOS_TABLE!}
        (${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK!}, ${process.env.POSTGRES_PHOTOS_TABLE_FILENAME!}, ${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION!}, ${process.env.POSTGRES_PHOTOS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, POINT($3, $4), to_timestamp($5))`, [idObject.cyprusCollection, 'PetraTouRomiou-1690370704091.jpg', 32.62697, 34.663517, timestamp])

    // collection 'Lille - France' -> ID 6

    await query(`
        INSERT INTO ${process.env.POSTGRES_PHOTOS_TABLE!}
        (${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK!}, ${process.env.POSTGRES_PHOTOS_TABLE_FILENAME!}, ${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION!}, ${process.env.POSTGRES_PHOTOS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, POINT($3, $4), to_timestamp($5))`, [idObject.lilleCollection, 'NotreTreille-1690448377249.jpeg', 3.073520, 50.635850, timestamp])

    await query(`
        INSERT INTO ${process.env.POSTGRES_PHOTOS_TABLE!}
        (${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK!}, ${process.env.POSTGRES_PHOTOS_TABLE_FILENAME!}, ${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION!}, ${process.env.POSTGRES_PHOTOS_TABLE_TIMESTAMP!})
        VALUES 
        ($1, $2, POINT($3, $4), to_timestamp($5))`, [idObject.lilleCollection, 'PalaisDesBeauxArts-1690448540126.jpeg', 3.060930, 50.631250, timestamp])
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