import { type Request, type Response, type NextFunction } from 'express'
import { ZodError } from 'zod'
import { ResponseError } from '../error/response-error'

export const errorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (error instanceof ZodError) {
    res.status(400).json({
      error: true,
      message: `validation error: ${JSON.stringify(error)}`
    })
  } else if (error instanceof ResponseError) {
    res.status(error.status).json({
      error: true,
      message: error.message
    })
  } else {
    res.status(500).json({
      error: true,
      message: error.message
    })
  }
}
