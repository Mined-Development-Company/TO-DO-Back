import dotenv from 'dotenv'
import express from 'express'
import { loginRouter } from './routes/login'
import { registerRouter } from './routes/register'

dotenv.config()
const app = express()

app.use(express.json())
app.use(registerRouter)
app.use(loginRouter)

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.listen(process.env.PORT || 3333, () => {
	console.log('Server is running on port 3333')
})
