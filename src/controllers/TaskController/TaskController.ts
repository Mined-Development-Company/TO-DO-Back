import { z } from 'zod'
import { TaskRepository } from '../../classes'
import type { Request, Response } from 'express'
import { tasksValidation } from '../../validations/tasksValidation'

export class TaskRouterController {
	async get(req: Request, res: Response) {
		try {
			const userId = req.userId
			const { page = 1, qty = 5 } = req.query

			const tasks = await TaskRepository.get(Number(page), Number(qty), Number(userId))

			return res.status(200).json(tasks)
		} catch (error) {
			return res.status(400).json({ message: 'Ops... algo deu errado' })
		}
	}

	async create(req: Request, res: Response) {
		try {
			const userId = Number(req.userId)
			const { title, priority } = tasksValidation.parse(req.body)

			const task = await TaskRepository.create({
				title,
				priority,
				userId
			})

			return res.status(201).json({ message: 'Tarefa criada com sucesso' })
		} catch (error) {
			if (error instanceof z.ZodError) {
				return res.status(400).json(error.issues[0])
			}
		}
	}

	async update(req: Request, res: Response) {
		try {
			const { id } = req.params

			const task = await TaskRepository.update(Number(id))

			return res.status(200).json({ message: 'Tarefa atualizada com sucesso' })
		} catch (error) {
			return res.status(400).json({ message: 'Ops... algo deu errado' })
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const { id } = req.params

			const task = await TaskRepository.delete(Number(id))

			return res.status(200).json({ message: 'Tarefa deletada com sucesso' })
		} catch (error) {
			return res.status(400).json({ message: 'Ops... algo deu errado' })
		}
	}
}
