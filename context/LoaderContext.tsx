'use client'

import { useState, createContext, Dispatch, SetStateAction, useMemo, ReactNode } from 'react'

type TLoaderContextProps = {
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

const LoaderContext: React.Context<TLoaderContextProps> = createContext<TLoaderContextProps>({
  isLoading: false,
  setIsLoading: () => null,
})

const LoaderContextProvider = (props: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false)

  const contextProps = useMemo(() => ({ isLoading, setIsLoading }), [isLoading])

  return <LoaderContext.Provider value={contextProps}>{props.children}</LoaderContext.Provider>
}

export { LoaderContext, LoaderContextProvider }
