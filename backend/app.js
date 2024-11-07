import express from 'express'
import databaseConnection from './database/dbConnection.js'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import router from './routes/userAuthRoute.js'
import path from 'path'
import { fileURLToPath } from 'url'


// Load environment variables
dotenv.config({ path: './config/config.env' })

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Log the static path
export const staticPath = path.join(__dirname, 'public')
const new__dirname = path.resolve()
console.log("the new dirname>>>>",new__dirname);
const app = express()

// Serve static files from the "public" directory
app.use(express.static(staticPath))

app.set('view engine', 'jsx')
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API routes
app.use('/api/v4/user', router)

// Database connection
databaseConnection()

export default app
