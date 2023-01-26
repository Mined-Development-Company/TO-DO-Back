import { z } from 'zod'
import type { Request, Response } from 'express'
import { loginValidation } from '../../validations/loginValidation'
import { PasswordRepository, TokenRepository, UserRepository } from '../../classes'

export class LoginRouterController {
	async authUser(req: Request, res: Response) {
		try {
			const { email, password } = loginValidation.parse(req.body)

			if (!email || !password) {
				return res.status(400).json({ message: 'Preencha todos os campos' })
			}

			const user = await UserRepository.findByEmail(email)

			if (!user) {
				return res.status(400).json({ message: 'Usuário não existe' })
			}

			const isPasswordCorrect = await PasswordRepository.verify(user.password, password)

			if (!isPasswordCorrect) {
				return res.status(400).json({ message: 'Senha incorreta' })
			}

			const token = await TokenRepository.sign({
				...user,
				password: null
			})

			return res.status(200).json({
				name: user.name,
				email: user.email,
				token: token
			})
		} catch (error) {
			if (error instanceof z.ZodError) {
				return res.status(400).json(error.issues[0])
			}
		}
	}
}
