import { useEffect } from 'react'

import { UseMutationResult } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'

import useLoader from './useLoader'

type Params<T, P> = {
  mutation: UseMutationResult<T, unknown, P, unknown>
  refreshKey?: string
  successMessage?: string
  noSuccessAlert?: boolean
  noErrorAlert?: boolean
  noLoader?: boolean
  errorMessage?: string
  autoHideDuration?: number
}

const SUCCESS_MESSAGE = 'Los cambios se realizaron exitosamente'
const ERROR_MESSAGE = 'Hubo un error. Intentalo nuevamente'

export const useMutationAlert = <T, P>(params: Params<T, P>) => {
  const {
    mutation: request,
    noErrorAlert = false,
    noSuccessAlert = false,
    noLoader = false,
    autoHideDuration = 5000,
    successMessage = SUCCESS_MESSAGE,
    errorMessage = ERROR_MESSAGE,
  } = params

  const { enqueueSnackbar } = useSnackbar()
  useLoader({ request, noLoader })

  useEffect(() => {
    if (request.isError && !noErrorAlert) {
      const httpError = request.error
      enqueueSnackbar((httpError as { message: string }).message ?? errorMessage, {
        variant: 'error'
      })
    }
    if (request.isSuccess && !noSuccessAlert) {
      enqueueSnackbar(successMessage, {
        variant: 'success',
        autoHideDuration: autoHideDuration ?? 5000
      })
    }
  }, [request.isError, request.isSuccess])
}

export default useMutationAlert