import { User } from '@prisma/client'

export interface IUserData extends User {}

export interface IUserRepositoryCreate {
	email: string
	password: string
	name: string
}

export interface IUserRepository {
	create(props: IUserRepositoryCreate): Promise<IUserData>
	findByEmail(email: string): Promise<IUserData | null>
}
