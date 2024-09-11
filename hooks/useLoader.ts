import { useContext, useEffect } from 'react'

import { UseMutationResult, UseQueryResult } from '@tanstack/react-query'

import { LoaderContext } from 'context/LoaderContext'

type Params<T, P> = {
  request?: UseMutationResult<T, unknown, P, unknown> | UseQueryResult<T, unknown>
  noLoader?: boolean
}

export const useLoader = <T, P>(params: Params<T, P> = {}) => {
  const { request, noLoader } = params

  const loader = useContext(LoaderContext)
  const { setIsLoading } = loader

  useEffect(() => {
    if (!noLoader && request) setIsLoading(request.isPending)
  }, [request?.isPending])

  return loader
}

export default useLoader