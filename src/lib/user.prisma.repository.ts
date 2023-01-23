import { prisma } from '../utils/prisma'
import { IUserData, IUserRepository, IUserRepositoryCreate } from '../interfaces/user.repository.interface'

export class UserPrismaRepository implements IUserRepository {
	async create(props: IUserRepositoryCreate): Promise<IUserData> {
		return await prisma.user.create({
			data: {
				email: props.email,
				password: props.password,
				name: props.name
			}
		})
	}

	async findByEmail(email: string): Promise<IUserData | null> {
		return await prisma.user.findUnique({
			where: {
				email
			}
		})
	}
}
