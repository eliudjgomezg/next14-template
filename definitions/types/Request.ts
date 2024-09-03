export type MutationMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type Method = 'GET' | MutationMethod

export type CustomHeader = Record<string, string> | undefined

export type ResponseTypes = 'arraybuffer' | 'document' | 'json' | 'text' | 'stream' | 'blob'

export type Fetch<K = void> = {
  endpoint: string
  method?: Method
  customHeader?: CustomHeader
  body?: Partial<K> | BodyInit | Blob | ArrayBuffer
  queryParams?: QueryParams
  cleanQueryParams?: boolean
  responseType?: ResponseTypes
}

export type Get = {
  endpoint: string
  customHeader?: CustomHeader
  queryParams?: QueryParams
  responseType?: ResponseTypes
}

export type Post<T> = {
  body: T
  responseType?: ResponseTypes
}

export type Put<T = void> = {
  body?: T
  id: string
  responseType?: ResponseTypes
}

export type Delete = {
  id: string
  responseType?: ResponseTypes
}

export type RequestMethods<T> = Params<T> | Post<T> | Put<T> | Delete

export type Mutation<K> = Fetch<K>

export type Params<T> = {
  body?: T
  id?: string
  method: MutationMethod
}

export type QueryResponse<T> = {
  response: T
}

export type QueryError = {
  error: string
  message: string
  statusCode: number
}

export type PaginatedResponse<T> = {
  //Agrega acá el type de la paginación del proyecto
  count: number
  rows: T[]
}

export type QueryParams = unknown //Agrega acá el type del query params del proyecto

export type QueryOptions = { queryParams?: QueryParams } & ReactQueryOptions

export type ReactQueryOptions = {
  reactQueryOptions?: {
    enabled?: boolean
    retry?: boolean | number
    cacheTime?: number
    refetchOnWindowFocus?: boolean | 'always'
    useErrorBoundary?: boolean
  }
}
