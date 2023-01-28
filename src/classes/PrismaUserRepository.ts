import { prisma } from '../utils/prisma'
import { IUserData, IUserRepository, IUserRepositoryCreate } from '../interfaces'

export class PrismaUserRepository implements IUserRepository {
	async create(user: IUserRepositoryCreate): Promise<IUserData> {
		const newUser = await prisma.user.create({
			data: {
				name: user.name,
				email: user.email,
				password: user.password
			}
		})

		return newUser
	}

	async findByEmail(email: string): Promise<IUserData | null> {
		const user = await prisma.user.findUnique({
			where: {
				email: email
			}
		})

		return user
	}
}
