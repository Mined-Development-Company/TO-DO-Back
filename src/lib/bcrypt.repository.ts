import bcrypt from 'bcrypt'
import { IPasswordRepository } from '../interfaces/password.repository.interface'

export class BcryptRepository implements IPasswordRepository {
	async hash(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(10)
		return await bcrypt.hash(password, salt)
	}

	async verify(hash: string, password: string): Promise<boolean> {
		return await bcrypt.compare(password, hash)
	}
}
