
import autoBind from 'auto-bind'
import { getSession } from 'next-auth/react'
import { Session } from 'next-auth/types';

import { auth } from 'auth';
import { Fetch, Get, Mutation, Post, Put } from 'definitions/types/Request'

import { buildQuery } from './helpers'

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL

const defaultHeader = async (isRunningOnServer: boolean) => {
  let session: Session | null = null

  if (isRunningOnServer) {
    session = await auth()
  } else {
    session = await getSession()
  }
  const Authorization = session && session.user ? `Bearer ${session?.user?.tokens?.accessToken}` : ''
  return { Authorization }
}


export class APIClient {
  server: string
  isRunningOnServer: boolean

  constructor(SERVER: string) {
    this.server = SERVER
    this.isRunningOnServer = typeof window === 'undefined'
    autoBind(this)
  }

  async fetch<T, K>(params: Fetch<K>): Promise<T> {
    const { endpoint, method = 'GET', customHeader = undefined, queryParams, responseType = 'json' } = params
    let { body = undefined } = params
    const headers = customHeader ? {} : await defaultHeader(this.isRunningOnServer)
    let contentHeader = {}

    const isJsonBody = !this.isRunningOnServer && body && !(body instanceof FormData) && typeof body === 'object'

    if (this.isRunningOnServer || isJsonBody) {
      contentHeader = { 'Content-Type': 'application/json' }
      body = JSON.stringify(body)
    }

    const url = `${this.server}${endpoint}${queryParams ? buildQuery(queryParams as Record<string, unknown>) : ''}`

    const request = await fetch(url, {
      method,

      body: body as BodyInit | null | undefined,
      headers: { ...headers, ...contentHeader },
    })

    if (request.ok && responseType === 'json') return (await request.json()) as unknown as T
    if (request.ok && responseType === 'blob') return (await request.blob()) as unknown as T
    if (request.ok && responseType === 'text') return (await request.text()) as unknown as T

    const error = await this.tryJson(request)
    throw error
  }

  async tryJson(res: Response) {
    try {
      return await res.json()
    } catch (e) {
      return null
    }
  }

  get<T>({ endpoint, customHeader, responseType, queryParams }: Get): Promise<T> {
    return this.fetch({ endpoint, customHeader, responseType, queryParams })
  }
  post<P, B>({ endpoint, body, customHeader, responseType }: Post<B> & Get): Promise<P> {
    return this.fetch<P, B>({ endpoint, method: 'POST', body, customHeader, responseType })
  }
  put<P, B>({ endpoint, body, customHeader, responseType }: Omit<Put<B>, 'id'> & Get): Promise<P> {
    return this.fetch<P, B>({ endpoint, method: 'PUT', body, customHeader, responseType })
  }
  patch<P, B>({ endpoint, body, customHeader, responseType }: Omit<Put<B>, 'id'> & Get): Promise<P> {
    return this.fetch<P, B>({ endpoint, method: 'PATCH', body, customHeader, responseType })
  }
  delete<P>({ endpoint, customHeader, responseType }: Get): Promise<P> {
    return this.fetch<P, null>({ endpoint, method: 'DELETE', customHeader, responseType })
  }

  mutation<T, K>({ endpoint, method, body, customHeader = undefined }: Mutation<K>): Promise<T> {
    return this.fetch({ endpoint, method, body, customHeader })
  }

  queryFile({ endpoint, customHeader, responseType = 'blob', queryParams }: Get): Promise<Blob> {
    return this.fetch<Blob, null>({ endpoint, customHeader, responseType, queryParams })
  }
  postFile<P>({ endpoint, body, customHeader, responseType = 'blob' }: Post<P> & Get): Promise<Blob> {
    return this.fetch<Blob, P>({ endpoint, method: 'POST', body, customHeader, responseType })
  }
  putFile<P>({ endpoint, body, customHeader, responseType = 'blob' }: Omit<Put<P>, 'id'> & Get): Promise<Blob> {
    return this.fetch<Blob, P>({ endpoint, method: 'PUT', body, customHeader, responseType })
  }
}

export const apiClient = new APIClient(BASE_URL ?? '')
