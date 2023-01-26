import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { routes } from './routes'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use(routes)

app.listen(process.env.PORT || 3333, () => {
	console.log('Server is running on port 3333')
})
