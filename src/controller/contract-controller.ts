import type { Response, NextFunction } from 'express'
import type { UpdateContactRequest, CreateContactRequest } from '../model/contact-model'
import { ContactService } from '../service/contact-service'
import { type UserRequest } from '../type/user-request'

export class ContactController {
  static create = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (req.user !== undefined) {
        const request: CreateContactRequest = req.body as CreateContactRequest
        const response = await ContactService.create(req.user, request)

        res.status(201).json({
          error: false,
          message: 'contact created',
          data: response
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static get = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (req.user !== undefined) {
        const contactId = Number(req.params.contactId)
        const response = await ContactService.get(req.user, contactId)

        res.status(200).json({
          error: false,
          data: response
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static update = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (req.user !== undefined) {
        const request: UpdateContactRequest = req.body as UpdateContactRequest
        request.id = Number(req.params.contactId)
        const response = await ContactService.update(req.user, request)

        res.status(200).json({
          error: false,
          message: 'contact updated',
          data: response
        })
      }
    } catch (error) {
      next(error)
    }
  }
}
