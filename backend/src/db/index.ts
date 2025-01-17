import { Pool, QueryResult } from 'pg'
import { seed } from './seed'

console.log(`${process.env.POSTGRES_USERNAME} | ${process.env.POSTGRES_HOST} | ${process.env.POSTGRES_DATABASE} | ${process.env.POSTGRES_PASSWORD} | ${process.env.POSTGRES_PORT}`)

const pool = new Pool({
    user: process.env.POSTGRES_USERNAME!,
    host: process.env.POSTGRES_HOST!,
    database: process.env.POSTGRES_DATABASE!,
    password: process.env.POSTGRES_PASSWORD!,
    port: parseInt(process.env.POSTGRES_PORT!)
})

pool.on('error', (err) => {
    console.log(err)
})

/*pool.connect((err) => {
    if(err) {
        console.log(err)
        handleReconnectionPolicy()
        return
    }
    console.log('Connected to database!')
})*/

/*const query = (text: string, params: any, callback: (err: Error, result: QueryResult<any>) => void) => {
    return pool.query(text, params, callback)
}*/

const query = (text: string, params: any) => {
    return pool.query(text, params)
}

const createDefaultTable = async () => {
    try {
        const result = await query(`
            CREATE TABLE IF NOT EXISTS ${process.env.POSTGRES_GEOJSON_TABLE} (
                ${process.env.POSTGRES_GEOJSON_TABLE_ID} SERIAL PRIMARY KEY,
                ${process.env.POSTGRES_GEOJSON_TABLE_NAME} VARCHAR NOT NULL,
                ${process.env.POSTGRES_GEOJSON_TABLE_GEOM} TEXT
            );
            CREATE TABLE IF NOT EXISTS ${process.env.POSTGRES_COLLECTIONS_TABLE} (
                ${process.env.POSTGRES_COLLECTIONS_TABLE_ID} SERIAL PRIMARY KEY,
                ${process.env.POSTGRES_COLLECTIONS_TABLE_NAME} VARCHAR NOT NULL,
                ${process.env.POSTGRES_COLLECTIONS_TABLE_DESC} VARCHAR,
                ${process.env.POSTGRES_COLLECTIONS_TABLE_TIMESTAMP} TIMESTAMP NOT NULL
            );
            CREATE TABLE IF NOT EXISTS ${process.env.POSTGRES_PHOTOS_TABLE} (
                ${process.env.POSTGRES_PHOTOS_TABLE_ID} SERIAL PRIMARY KEY,
                ${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK} INT,
                ${process.env.POSTGRES_PHOTOS_TABLE_FILENAME} VARCHAR,
                ${process.env.POSTGRES_PHOTOS_TABLE_PHOTO_POSITION} POINT NOT NULL,
                ${process.env.POSTGRES_PHOTOS_TABLE_TIMESTAMP} TIMESTAMP NOT NULL,
                CONSTRAINT fk_collection
                    FOREIGN KEY (${process.env.POSTGRES_PHOTOS_TABLE_COLLECTION_FK})
                        REFERENCES ${process.env.POSTGRES_COLLECTIONS_TABLE}(${process.env.POSTGRES_COLLECTIONS_TABLE_ID})
            );
        `, [])
        console.log(`Created ${process.env.POSTGRES_COLLECTIONS_TABLE} and ${process.env.POSTGRES_PHOTOS_TABLE} table!`)
        await seed()
    } catch (err) {
        console.log(err)
    }
}

const handleReconnectionPolicy = async (maxAttempts: number, delay: number) => {
    let attempts = 0
    while (attempts < maxAttempts) {
        try {
            await pool.connect()
            console.log('Connected to the database!')
            return
        } catch (err) {
            console.log(`Attempt ${attempts + 1} failed. Retrying in ${delay} ms.`)
            await new Promise((resolve) => setTimeout(resolve, delay))
            attempts++
        }
    }
    console.log('Max connection attempts reached. Could not connect to the database.');
}

export { 
    query,
    createDefaultTable,
    handleReconnectionPolicy
 }