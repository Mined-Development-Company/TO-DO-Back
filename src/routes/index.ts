import { Router } from 'express'
import { loginRouter } from './login'
import { registerRouter } from './register'
import { swaggerRouter } from './docs'
import { tasksRouter } from './tasks'
import { authMiddleware } from '../middleware/auth'

export const routes = Router()

routes.use('/login', loginRouter)
routes.use('/register', registerRouter)
routes.use('/docs', swaggerRouter)

routes.use(authMiddleware)
routes.use('/tasks', tasksRouter)
