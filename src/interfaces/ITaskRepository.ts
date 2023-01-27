import type { ToDo } from '@prisma/client'

export interface ITaskData extends ToDo {}

export type ITaskRepositoryTransaction = [number, ITaskData[]]

export interface ITaskRepositoryCreate {
	title: string
	priority: number
	userId: number
}

export interface ITaskRepository {
	get(page: number, qty: number, userId?: number): Promise<ITaskRepositoryTransaction>
	create(task: ITaskRepositoryCreate): Promise<ITaskData>
	update(id: number): Promise<ITaskData>
	delete(id: number): Promise<ITaskData>
}
