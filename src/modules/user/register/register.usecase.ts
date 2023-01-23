import { IPasswordRepository } from '../../../interfaces/password.repository.interface'
import { IUserRepository } from '../../../interfaces/user.repository.interface'

import { IRegisterUserRequestDTO } from './register.dto'

export class RegisterUseCase {
	constructor(private UserRepository: IUserRepository, private PasswordRepository: IPasswordRepository) {}

	async execute(props: IRegisterUserRequestDTO): Promise<any> {
		const userExists = await this.UserRepository.findByEmail(props.email)

		if (userExists) {
			throw new Error('Usuário já cadastrado.')
		}

		const hash = await this.PasswordRepository.hash(props.password)

		await this.UserRepository.create({
			...props,
			password: hash
		})

		return { message: 'Usuário cadastrado com sucesso!' }
	}
}
