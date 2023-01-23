import * as jwt from 'jsonwebtoken'
import { ITokenRepository } from '../interfaces'

export class JsonWebTokenRepository implements ITokenRepository {
	async sign(data: any): Promise<string> {
		return jwt.sign(data, 'example/secret', {
			expiresIn: '7d'
		})
	}
}
