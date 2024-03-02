import type { Request, Response, NextFunction } from 'express'
import { type CreateUserRequest } from '../model/user-model'
import { UserService } from '../service/user-service'

export class UserController {
  static register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest
      const response = await UserService.register(request)

      res.status(200).json({
        error: false,
        message: 'registration success',
        data: response
      })
    } catch (error) {
      next(error)
    }
  }
}
