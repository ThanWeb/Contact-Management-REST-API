import type { Response, NextFunction } from 'express'
import { type UserRequest } from '../type/user-request'
import type { GetAddressRequest, CreateAddressRequest, UpdateAddressRequest, RemoveAddressRequest } from '../model/address-model'
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

  static get = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (req.user !== undefined) {
        const request: GetAddressRequest = {
          id: Number(req.params.addressId),
          contact_id: Number(req.params.contactId)
        }

        const response = await AddressService.get(req.user, request)

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
        const request: UpdateAddressRequest = req.body as UpdateAddressRequest
        request.contact_id = Number(req.params.contactId)
        request.id = Number(req.params.addressId)

        const response = await AddressService.update(req.user, request)

        res.status(200).json({
          error: false,
          message: 'address updated',
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
        const request: RemoveAddressRequest = {
          id: Number(req.params.addressId),
          contact_id: Number(req.params.contactId)
        }

        await AddressService.remove(req.user, request)

        res.status(200).json({
          error: false,
          message: 'address removed'
        })
      }
    } catch (error) {
      next(error)
    }
  }
}
