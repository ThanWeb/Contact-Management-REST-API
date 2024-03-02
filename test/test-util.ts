import { prismaClient } from '../src/application/database'

export class UserTest {
  static async delete (): Promise<void> {
    await prismaClient.user.deleteMany({
      where: {
        username: 'test'
      }
    })
  }
}
