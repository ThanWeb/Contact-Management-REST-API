import type { Response, NextFunction } from 'express'
import { type UserRequest } from '../type/user-request'
import { type CreateAddressRequest } from '../model/address-model'
import { AddressService } from '../service/address-service'

export class AddressController {
  static create = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (req.user !== undefined) {
        const request: CreateAddressRequest = req.body as CreateAddressRequest
        request.contact_id = Number(req.params.contactId)
        const response = await AddressService.create(req.user, request)

        res.status(201).json({
          error: false,
          message: 'address created',
          data: response
        })
      }
    } catch (error) {
      next(error)
    }
  }
}
