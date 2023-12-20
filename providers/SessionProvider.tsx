import { ReactNode } from 'react'

import { SessionProvider } from 'next-auth/react'

import { auth } from 'auth'

const AuthSessionProvider = async ({ children }: { children: ReactNode }) => {
  const session = await auth()
  return <SessionProvider session={session}>{children}</SessionProvider>
}

export default AuthSessionProvider
