'use client'

import useLoaderContext from 'hooks/useLoaderContext'

import Loader from './Loader'

export const LoaderPage = () => {
  const loader = useLoaderContext()

  return <Loader isOpen={loader.isLoading} />
}

export default LoaderPage
