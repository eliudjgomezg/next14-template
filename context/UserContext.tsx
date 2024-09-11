'use client'

import { useState, createContext, Dispatch, SetStateAction, useMemo, ReactNode, useEffect } from 'react'

import { useSession } from 'next-auth/react'

import { User, UserRole } from 'definitions/types/User'

type TUserContextProps = {
  user: User | undefined
  userRole: UserRole | undefined
  setUser: Dispatch<SetStateAction<User | undefined>>
  setUserRole: Dispatch<SetStateAction<UserRole | undefined>>
}

const UserContext: React.Context<TUserContextProps> = createContext<TUserContextProps>({
  user: undefined,
  userRole: undefined,
  setUser: () => null,
  setUserRole: () => null,
})

const UserContextProvider = (props: { children: ReactNode }) => {
  const { data: session, status: sessionStatus } = useSession()

  const [user, setUser] = useState<User | undefined>()
  const [userRole, setUserRole] = useState<UserRole | undefined>()

  const contextProps = useMemo(() => ({ user, userRole, setUser, setUserRole }), [user, userRole])

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      const { tokens, ...rest } = session.user

      setUser(rest)
      setUserRole(rest.role)
    }
  }, [sessionStatus, session])

  return <UserContext.Provider value={contextProps}>{props.children}</UserContext.Provider>
}

export { UserContext, UserContextProvider }
