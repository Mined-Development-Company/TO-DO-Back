import { BcryptRepository } from '../../../lib/bcrypt.repository'
import { JsonWebTokenRepository } from '../../../lib/jsonwebtoken.repository'
import { UserPrismaRepository } from '../../../lib/user.prisma.repository'
import { AuthController } from './auth.controller'
import { AuthUseCase } from './auth.usecase'

const UserRepository = new UserPrismaRepository()
const TokenRepository = new JsonWebTokenRepository()
const PasswordRepository = new BcryptRepository()

const authUseCase = new AuthUseCase(UserRepository, TokenRepository, PasswordRepository)

const authController = new AuthController(authUseCase)

export { authUseCase, authController }
