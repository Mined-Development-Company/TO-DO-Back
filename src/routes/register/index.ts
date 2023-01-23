import { z } from 'zod'
import { Router } from 'express'

import { registerValidation } from '../../validations/registerValidation'
import { registerController } from '../../modules/user/register'

export const registerRouter = Router()

registerRouter.all('/register', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'POST')
	res.header('Access-Control-Allow-Headers', 'Content-Type')
	if (req.method === 'POST') {
		next()
	} else {
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
})

registerRouter.post('/register', async (req, res) => {
	try {
		const body = registerValidation.parse(req.body)

		const { status, data, error } = await registerController.handle({
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
