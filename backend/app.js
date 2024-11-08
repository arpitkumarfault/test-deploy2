import express from 'express'
import databaseConnection from './database/dbConnection.js'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import router from './routes/userAuthRoute.js'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config({ path: './config/config.env' })

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const staticPath = path.join(__dirname, 'public')
const app = express()

app.use(express.static(staticPath))

app.set('view engine', 'jsx')
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API routes
app.use('/api/v4/user', router)

databaseConnection()

export default app
