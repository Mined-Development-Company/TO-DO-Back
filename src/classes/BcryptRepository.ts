import bcrypt from 'bcrypt'
import { IPasswordRepository } from '../interfaces'

export class BcryptRepository implements IPasswordRepository {
	async hash(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)

		return hashedPassword
	}

	async verify(hash: string, password: string): Promise<boolean> {
		const isPasswordCorrect = await bcrypt.compare(password, hash)
    
		return isPasswordCorrect
	}
}
