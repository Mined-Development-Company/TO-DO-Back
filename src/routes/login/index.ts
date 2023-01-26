import { Router } from 'express'
import { LoginController } from '../../controllers/LoginController'

export const loginRouter = Router()

loginRouter.all('/', (req, res, next) => {
	if (req.method === 'POST') {
		next()
	} else {
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
})

loginRouter.post('/', LoginController.authUser)
