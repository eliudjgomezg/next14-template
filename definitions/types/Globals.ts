import { UserRole } from "./User"

export type File = {
  name: string
  url: string
  position: number
}

export type Address = {
  country: string
  city: string
}

export type BaseUser = {
  _id: string
  name: string
  last_name: string
  second_last_name: string
  email: string
  phone: string
  address: Address
}

export type RoutePath = {
  path: string
  allowedRoles: UserRole[]
}

export type Language = {
  es: string
  en: string
  pt: string
}

export type CrudModalActions = 'create' | 'update' | 'remove' | 'suspend'
