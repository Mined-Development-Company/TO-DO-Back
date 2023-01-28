import type { User } from '@prisma/client'

export interface IUserData extends User {}

export interface IUserRepositoryCreate {
	name: string
	email: string
	password: string
}

export interface IUserRepository {
	create(user: IUserRepositoryCreate): Promise<IUserData>
	findByEmail(email: string): Promise<IUserData | null>
}
