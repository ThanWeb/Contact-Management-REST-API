import { type User } from '@prisma/client'
import { toContactResponse, type ContactResponse, type CreateContactRequest } from '../model/contact-model'
import { ContactValidation } from '../validation/contact-validation'
import { Validation } from '../validation/validation'
import { prismaClient } from '../application/database'

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
}
