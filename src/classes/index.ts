import { JWTRepository } from './JWTRepository'
import { BcryptRepository } from './BcryptRepository'
import { PrismaRepository } from './PrismaRepository'

export const TokenRepository = new JWTRepository()
export const PasswordRepository = new BcryptRepository()
export const UserRepository = new PrismaRepository()
