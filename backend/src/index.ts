import express, { Express } from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import cors from 'cors'

// load environment variables
dotenv.config()

const port = process.env.PORT || 3000
const app: Express = express()

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( { extended: true } ))
app.use(cors({
    origin: 'http://localhost:8080'
}))

// set the static folder of images
app.use(process.env.EXPRESS_STATIC_FILE_API!, express.static(process.env.MULTER_DESTINATION!))

// import API
import { router as api } from './api/index'

app.use('/api', api)

// initialize the database
import { createDefaultTable, handleReconnectionPolicy } from './db/index'

// when deploying the app on kubernetes it is not possible to know if the db is already started so use handleReconnectionPolicy to handle this case and starting to accept connection when db is ready

handleReconnectionPolicy(parseInt(process.env.POSTGRES_RECONNECTION_POLICY_MAX_ATTEMPTS!), parseInt(process.env.POSTGRES_RECONNECTION_POLICY_DELAY!))
    .then(async (data) => {
        await createDefaultTable()

        app.listen(port, () => {
            console.log(`Listening on ${port}`)
        })
    })
    .catch(err => {
        console.log(err)
    })