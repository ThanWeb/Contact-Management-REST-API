import { type User } from '@prisma/client'

export interface UserResponse {
  username: string
  name: string
  token?: string
}

export interface CreateUserRequest {
  username: string
  name: string
  password: string
}

export interface LoginUserRequest {
  username: string
  password: string
}

export function toUserResponse (user: User): UserResponse {
  return {
    name: user.name,
    username: user.username
  }
}
