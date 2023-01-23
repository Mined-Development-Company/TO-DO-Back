import { IPasswordRepository, ITokenRepository, IUserRepository } from '../../../interfaces/'
import { IAuthUserRequestDTO } from './auth.dto'

export class AuthUseCase {
	constructor(
		private UserRepository: IUserRepository,
		private TokenRepository: ITokenRepository,
		private PasswordRepository: IPasswordRepository
	) {}
	async execute(props: IAuthUserRequestDTO): Promise<any> {
		const isExistUser = await this.UserRepository.findByEmail(props.email)
		if (!isExistUser) throw new Error('Usuário não encontrado.')

		const comparePassword = await this.PasswordRepository.verify(isExistUser.password, props.password)

		if (!comparePassword) throw new Error('Senha incorreta')

		const token = await this.TokenRepository.sign({ ...isExistUser, password: null })

		return {
			token,
			email: isExistUser.email,
			name: isExistUser.name
		}
	}
}
