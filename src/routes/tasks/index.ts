import { Router } from 'express'
import { TaskController } from '../../controllers/TaskController'

export const tasksRouter = Router()

tasksRouter.get('/', TaskController.get)
tasksRouter.delete('/:id', TaskController.delete)
tasksRouter.post('/', TaskController.create)
tasksRouter.put('/:id', TaskController.update)
