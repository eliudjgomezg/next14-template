import { useContext, useEffect } from 'react'

import { UseMutationResult, UseQueryResult } from '@tanstack/react-query'

import { LoaderContext } from 'context/LoaderContext'

export const useLoader = <T, P>(request?: UseMutationResult<T, unknown, P, unknown> | UseQueryResult<T, unknown>) => {
  const loader = useContext(LoaderContext)

  useEffect(() => {
    loader.isLoading !== request?.isPending && request && loader.setIsLoading(request.isPending)
  }, [request?.isPending, loader, request])

  return loader
}

export default useLoader
