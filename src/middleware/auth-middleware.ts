import { type Response, type NextFunction } from 'express'
import { prismaClient } from '../application/database'
import { type UserRequest } from '../type/user-request'

export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.get('X-API-TOKEN')

  if (token !== undefined) {
    const user = await prismaClient.user.findFirst({
      where: {
        token
      }
    })

    if (user != null) {
      req.user = user
      next()
      return
    }
  }

  res.status(401).json({
    error: true,
    message: 'unauthorized'
  }).end()
}
