import type { Response, NextFunction } from 'express'
import type { UpdateContactRequest, CreateContactRequest, SearchContactRequest } from '../model/contact-model'
import { ContactService } from '../service/contact-service'
import { type UserRequest } from '../type/user-request'
import { logger } from '../application/logging'

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

  static remove = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (req.user !== undefined) {
        const contactId = Number(req.params.contactId)
        const response = await ContactService.remove(req.user, contactId)
        logger.debug(`response: ${JSON.stringify(response)}`)

        res.status(200).json({
          error: false,
          message: 'contact removed'
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static search = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (req.user !== undefined) {
        const request: SearchContactRequest = {
          name: req.query.name as string,
          email: req.query.email as string,
          phone: req.query.phone as string,
          page: req.query.page !== undefined ? Number(req.query.page) : 1,
          size: req.query.size !== undefined ? Number(req.query.size) : 10
        }

        const response = await ContactService.search(req.user, request)
        logger.debug(`response: ${JSON.stringify(response)}`)

        res.status(200).json({
          error: false,
          ...response
        })
      }
    } catch (error) {
      next(error)
    }
  }
}
