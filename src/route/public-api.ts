import express, { type Request, type Response, type NextFunction } from 'express'
import { UserController } from '../controller/user-controller'

export const publicRouter = express.Router()

publicRouter.get('/api/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    error: false,
    message: 'welcome'
  })
})

publicRouter.post('/api/users', UserController.register)
publicRouter.post('/api/users/login', UserController.login)
