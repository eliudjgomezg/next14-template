import { useMutation, useQuery } from '@tanstack/react-query'

import { Example } from 'definitions/types/Example'
import { Delete, Params, Post, Put, ReactQueryOptions } from 'definitions/types/Request'
import useMutationAlert from 'hooks/useMutationAlert'
import { apiClient } from 'utils/ApiClient'

import useLoader from '../hooks/useLoader'

const endpoints = {
  examples: `todos`,
  example: (id?: string) => `todos/${id}`,
}

export const useAllExampleQuery = (params: ReactQueryOptions = {}) => {
  const { reactQueryOptions } = params
  const endpoint = endpoints.examples

  const list = useQuery({
    ...reactQueryOptions,
    queryKey: [endpoint],
    queryFn: () => apiClient.get<Example[]>({ endpoint }),
    select: (data) => data,
  })
  useLoader(list)

  return list
}

export const useOneExampleQuery = (params: { id: string } & ReactQueryOptions) => {
  const { id, reactQueryOptions } = params
  const endpoint = endpoints.example(id)

  const item = useQuery({
    ...reactQueryOptions,
    queryKey: [endpoint],
    queryFn: () => apiClient.get<Example[]>({ endpoint }),
    select: (data) => data,
  })

  return item
}

export const useCreateExample = () => {
  const mutationAlert = useMutationAlert({ refreshKey: endpoints.examples })

  return useMutation({
    ...mutationAlert,
    mutationFn: ({ body }: Post<Example>) => apiClient.mutation<Example, Example>({ endpoint: endpoints.example(), body }),
  })
}

export const useUpdateExample = () => {
  const mutationAlert = useMutationAlert({ refreshKey: endpoints.examples })

  return useMutation({
    ...mutationAlert,
    mutationFn: ({ body, id }: Put<Example>) => apiClient.mutation<Example, Example>({ endpoint: endpoints.example(id), body }),
  })
}

export const useDeleteExample = () => {
  const mutationAlert = useMutationAlert({ refreshKey: endpoints.examples })

  return useMutation({
    ...mutationAlert,
    mutationFn: ({ id }: Delete) => apiClient.mutation<Example, Example>({ endpoint: endpoints.example(id) }),
  })
}

export const useExampleMutation = () => {
  const mutationAlert = useMutationAlert({ refreshKey: endpoints.examples })

  return useMutation({
    ...mutationAlert,
    mutationFn: ({ method, body, id = undefined }: Params<Partial<Example>>) =>
      apiClient.mutation<Example, Example>({ endpoint: endpoints.example(id), body, method }),
  })
}
