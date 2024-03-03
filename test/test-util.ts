import bcrypt from 'bcrypt'
import { prismaClient } from '../src/application/database'

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
}
