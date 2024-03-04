import { type Contact } from '@prisma/client'

export interface ContactResponse {
  id: number
  first_name: string
  last_name?: string | null
  email?: string | null
  phone?: string | null
}

export interface CreateContactRequest {
  first_name: string
  last_name?: string
  email?: string
  phone?: string
}

export interface UpdateContactRequest {
  id: number
  first_name: string
  last_name?: string
  email?: string
  phone?: string
}

export interface SearchContactRequest {
  name?: string
  email?: string
  phone?: string
  page: number
  size: number
}

export function toContactResponse (contact: Contact): ContactResponse {
  return {
    id: contact.id,
    first_name: contact.first_name,
    last_name: contact.last_name,
    email: contact.email,
    phone: contact.phone
  }
}
