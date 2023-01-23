import { BcryptRepository } from '../../../lib/bcrypt.repository'
import { UserPrismaRepository } from '../../../lib/user.prisma.repository'

import { RegisterUseCase } from './register.usecase'

import { RegisterController } from './register.controller'

const UserRepository = new UserPrismaRepository()
const PasswordRepository = new BcryptRepository()

const registerUseCase = new RegisterUseCase(UserRepository, PasswordRepository)
const registerController = new RegisterController(registerUseCase)

export { registerUseCase, registerController }
