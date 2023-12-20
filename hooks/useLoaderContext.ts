import { useContext } from 'react'

import { LoaderContext } from 'context/LoaderContext'

const useLoaderContext = () => {
  return useContext(LoaderContext)
}

export default useLoaderContext
