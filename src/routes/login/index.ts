import { z } from 'zod'
import { Router } from 'express'
import { loginValidation } from '../../validations/loginValidation'
import { authController } from '../../modules/user/auth'

export const loginRouter = Router()

loginRouter.all('/login', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'POST')
	res.header('Access-Control-Allow-Headers', 'Content-Type')
	if (req.method === 'POST') {
		next()
	} else {
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
})

loginRouter.post('/login', async (req, res) => {
	try {
		const body = loginValidation.parse(req.body)

		const { status, data, error } = await authController.handle({
			body
		})

		return res.status(status).json(error ? { error } : data)
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(400).json({ error: error.issues.map((elem) => elem.message) })
		}
		return res.status(500).json({ error })
	}
})
