import express, { Express } from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import bodyParser from 'body-parser'

// load environment variables
dotenv.config()

const port = process.env.PORT || 3000
const app: Express = express()

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( { extended: true } ))

//const db = require('./db/index')
// initialize the database
import { createDefaultTable } from './db/index'
createDefaultTable()

// import API
import { router as api } from './api/index'

app.use('/api', api)

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})