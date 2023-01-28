import jwt from 'jsonwebtoken'
import { ITokenRepository } from '../interfaces'

export class JWTRepository implements ITokenRepository {
	async sign(data: any): Promise<string> {
		const secret = process.env.JWT_SECRET as string
		const token = jwt.sign(data, secret, {
			expiresIn: '7d'
		})

		return token
	}
}
