import { useMutation, useQuery } from "@tanstack/react-query"

import { ApiVersionEnum } from "definitions/enums/globals"
import { Params, QueryResponse, ReactQueryOptions } from "definitions/types/Request"
import { User, UserMutationBody } from "definitions/types/User"
import useLoader from "hooks/useLoader"
import { apiClient } from "utils/ApiClient"

const baseName = `${ApiVersionEnum.V1}/users`
const endpoints = {
  users: baseName,
  user: (id?: string) => `${baseName}/${id ?? ''}`,
}

export const useAllUserQuery = (params: { queryParams?: unknown } & ReactQueryOptions = {}) => {
  const { queryParams, reactQueryOptions } = params
  const endpoint = endpoints.users

  const list = useQuery({
    ...reactQueryOptions,
    queryKey: [endpoint],
    queryFn: () => apiClient.get<QueryResponse<User[]>>({ endpoint, queryParams }),
    select: (data) => data.response,
  })
  useLoader({ request: list })

  return list
}

export const useOneUserQuery = (params: { id: string } & ReactQueryOptions) => {
  const { id, reactQueryOptions } = params
  const endpoint = endpoints.user(id)

  const item = useQuery({
    ...reactQueryOptions,
    queryKey: [endpoint, id],
    queryFn: () => apiClient.get<QueryResponse<User>>({ endpoint }),
    select: (data) => data.response,
  })
  useLoader({ request: item })

  return item
}

export const useUserMutation = () => {
  return useMutation({
    mutationFn: ({ method, body, id = undefined }: Params<UserMutationBody>) =>
      apiClient.mutation<QueryResponse<User>, UserMutationBody>({ endpoint: endpoints.user(id), body, method }),
  })
}
