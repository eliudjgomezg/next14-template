'use server'

import { AuthError } from 'next-auth'
import { z } from 'zod'

import { signIn, signOut } from 'auth'
import { ApiVersionEnum } from 'definitions/enums/globals'
import { LoginBody, WhoIAm } from 'definitions/types/Auth'
import { QueryError, QueryResponse } from 'definitions/types/Request'
import { apiClient } from 'utils/ApiClient'

const INVALID_CREDENTIALS = 'El usuario o contraseña son inválidos.'
const TRY_AGAIN = 'Intentalo nuevamente.'

export async function authenticate(credentials: LoginBody) {
  try {
    const { email, password } = credentials
    const parsedCredentials = z.object({ email: z.string().email(), password: z.string() }).safeParse(credentials)

    if (!parsedCredentials.success) INVALID_CREDENTIALS

    const { response: user }: QueryResponse<WhoIAm> = await apiClient.fetch({
      endpoint: `${ApiVersionEnum.V1}/auth/login`,
      body: { email, password },
      method: 'POST',
      customHeader: { 'Content-Type': 'application/json' }
    })

    if (!user) return INVALID_CREDENTIALS

    await signIn('credentials', { credentials: JSON.stringify(user), redirect: false, redirectTo: undefined })

    return 'success'
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': return TRY_AGAIN
        default: return INVALID_CREDENTIALS
      }
    }
    if ((error as QueryError).statusCode === 401) return (error as QueryError).message
    if ((error as QueryError).statusCode === 500) return TRY_AGAIN

    throw error
  }

}

export async function logOut(redirectTo: string) {
  await signOut({ redirect: true, redirectTo })
}

