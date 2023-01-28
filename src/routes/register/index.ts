import { Router } from 'express'
import { RegisterController } from '../../controllers/RegisterController'

export const registerRouter = Router()

registerRouter.all('/', (req, res, next) => {
	if (req.method === 'POST') {
		next()
	} else {
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
})

registerRouter.post('/', RegisterController.create)
