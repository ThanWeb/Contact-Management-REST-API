import bcrypt from 'bcrypt'
import { prismaClient } from '../src/application/database'
import type { Contact, User } from '@prisma/client'

export class UserTest {
  static async delete (): Promise<void> {
    await prismaClient.user.deleteMany({
      where: {
        username: 'test'
      }
    })
  }

  static async create (): Promise<void> {
    await prismaClient.user.create({
      data: {
        username: 'test',
        name: 'test',
        password: await bcrypt.hash('test', 10),
        token: 'test'
      }
    })
  }

  static async get (): Promise<User> {
    const user = await prismaClient.user.findUnique({
      where: {
        username: 'test'
      }
    })

    if (user == null) {
      throw new Error('user is not found')
    }

    return user
  }
}

export class ContactTest {
  static async deleteAll (): Promise<void> {
    await prismaClient.contact.deleteMany({
      where: {
        username: 'test'
      }
    })
  }

  static async create (): Promise<void> {
    await prismaClient.contact.create({
      data: {
        first_name: 'test',
        last_name: 'test',
        email: 'test@example.com',
        phone: '08888888',
        username: 'test'
      }
    })
  }

  static async get (): Promise<Contact> {
    const contact = await prismaClient.contact.findFirst({
      where: {
        username: 'test'
      }
    })

    if (contact == null) {
      throw new Error('contact is not found')
    }

    return contact
  }
}

export class AddressTest {
  static async deleteAll (): Promise<void> {
    await prismaClient.address.deleteMany({
      where: {
        contact: {
          username: 'test'
        }
      }
    })
  }
}
