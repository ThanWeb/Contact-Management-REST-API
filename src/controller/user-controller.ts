import type { Request, Response, NextFunction } from 'express'
import { type LoginUserRequest, type CreateUserRequest } from '../model/user-model'
import { UserService } from '../service/user-service'
import { type UserRequest } from '../type/user-request'

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

  static login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const request: LoginUserRequest = req.body as LoginUserRequest
      const response = await UserService.login(request)

      res.status(200).json({
        error: false,
        message: 'login success',
        data: response
      })
    } catch (error) {
      next(error)
    }
  }

  static get = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (req.user !== undefined) {
        const response = await UserService.get(req.user)

        res.status(200).json({
          error: false,
          data: response
        })
      }
    } catch (error) {
      next(error)
    }
  }
}
