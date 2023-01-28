import { JWTRepository } from './JWTRepository'
import { BcryptRepository } from './BcryptRepository'
import { PrismaUserRepository } from './PrismaUserRepository'
import { PrismaTaskRepository } from './PrismaTaskRepository'

export const TokenRepository = new JWTRepository()
export const PasswordRepository = new BcryptRepository()
export const UserRepository = new PrismaUserRepository()
export const TaskRepository = new PrismaTaskRepository()
