import { BaseUser } from "./Globals"

export type User = BaseUser & {
  is_disabled: boolean
  password: string
  has_default_password: boolean
  avatar: File
  role: UserRole
}

export type UserMutationBody = Partial<User>

export type UserRole = 'admin'
