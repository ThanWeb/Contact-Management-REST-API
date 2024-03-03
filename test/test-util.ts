import bcrypt from 'bcrypt'
import { prismaClient } from '../src/application/database'
import { type User } from '@prisma/client'

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
