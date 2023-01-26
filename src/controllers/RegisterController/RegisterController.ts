import { z } from 'zod'
import type { Response, Request } from 'express'
import { UserRepository, PasswordRepository } from '../../classes'
import { registerValidation } from '../../validations/registerValidation'

export class RegisterRouterController {
	async create(req: Request, res: Response) {
		try {
			const { name, email, password } = registerValidation.parse(req.body)

			if (!name || !email || !password) {
				return res.status(400).json({ message: 'Preencha todos os campos' })
			}

			const isUserExists = await UserRepository.findByEmail(email)

			if (isUserExists) {
				return res.status(400).json({ message: 'Usuário já cadastrado' })
			}

			const hashedPassword = await PasswordRepository.hash(password)

			const newUser = await UserRepository.create({
				...req.body,
				password: hashedPassword
			})

			return res.status(201).json({ message: 'Usuário criado com sucesso' })
		} catch (error) {
			if (error instanceof z.ZodError) {
				return res.status(400).json(error.issues[0])
			}
		}
	}
}
