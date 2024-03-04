import { type User } from '@prisma/client'
import { toContactResponse, type ContactResponse, type CreateContactRequest } from '../model/contact-model'
import { ContactValidation } from '../validation/contact-validation'
import { Validation } from '../validation/validation'
import { prismaClient } from '../application/database'
import { ResponseError } from '../error/response-error'

export class ContactService {
  static async create (user: User, request: CreateContactRequest): Promise<ContactResponse> {
    const createRequest = Validation.validate(ContactValidation.CREATE, request)

    const contact = await prismaClient.contact.create({
      data: {
        ...createRequest,
        ...{ username: user.username }
      }
    })

    return toContactResponse(contact)
  }

  static async get (user: User, id: number): Promise<ContactResponse> {
    const contact = await prismaClient.contact.findUnique({
      where: {
        id,
        username: user.username
      }
    })

    if (contact == null) {
      throw new ResponseError(404, 'contact not found')
    }

    return toContactResponse(contact)
  }
}
