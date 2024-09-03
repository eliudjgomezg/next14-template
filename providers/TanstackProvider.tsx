'use client'

import { ReactNode, useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
    },
  },
})

const TanstackProvider = (props: { children: ReactNode }) => {
  const [queryClient] = useState(() => defaultQueryClient)

  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
}

export default TanstackProvider
