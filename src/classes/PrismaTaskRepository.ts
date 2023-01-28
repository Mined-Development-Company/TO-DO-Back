import { prisma } from '../utils/prisma'
import { ITaskData, ITaskRepository, ITaskRepositoryCreate, ITaskRepositoryTransaction } from '../interfaces'

export class PrismaTaskRepository implements ITaskRepository {
	async get(page: number, qty: number, userId: number): Promise<ITaskRepositoryTransaction> {
		const tasks = await prisma.$transaction([
			prisma.toDo.count({
				where: {
					userId: userId
				}
			}),
			prisma.toDo.findMany({
				skip: (page - 1) * qty,
				take: qty,
				where: {
					userId: userId
				}
			})
		])

		return tasks
	}

	async create(data: ITaskRepositoryCreate): Promise<ITaskData> {
		const task = await prisma.toDo.create({
			data: {
				title: data.title,
				priority: data.priority,
				userId: data.userId
			}
		})

		return task
	}

	async update(id: number): Promise<ITaskData> {
		const taskSelected = await prisma.toDo.findUnique({
			where: {
				id: id
			}
		})

		const taskUpdated = await prisma.toDo.update({
			where: {
				id: id
			},
			data: {
				completed: !taskSelected?.completed
			}
		})

		return taskUpdated
	}

	async delete(id: number): Promise<ITaskData> {
		const task = await prisma.toDo.delete({
			where: {
				id: id
			}
		})

		return task
	}
}
