'use client'

import ErrorBoundaryMessage from 'layouts/ErrorBoundaryMessage'

export default function Error({ error }: { error: Error & { digest?: string } }) {
  return <ErrorBoundaryMessage error={error} />
}
