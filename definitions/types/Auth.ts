import { User } from 'next-auth'

import { User as AppUser } from 'definitions/types/User'

export type UserSession = AppUser & {
  tokens: {
    accessToken: string
    refreshToken: string
  }
}

declare module 'next-auth' {
  interface Session {
    user: UserSession & User & Omit<User, 'id'>
  }
}

export interface Login {
  access_token: string
  user: User
}

export interface LoginBody {
  email: string
  password: string
}

export type WhoIAm = AppUser & {
  access_token: string
  callbackUrl?: string
}
