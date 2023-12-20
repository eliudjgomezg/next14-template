import { User } from 'next-auth'

//Acá colocas la estructura que va a tener la sesión
export type UserSession = {
  role: string
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
