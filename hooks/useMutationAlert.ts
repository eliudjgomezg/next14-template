import { useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'

import useLoader from './useLoader'

type Params = {
  refreshKey?: string
  successMessage?: string
  noSuccessAlert?: boolean
  noErrorAlert?: boolean
  noLoader?: boolean
  errorMessage?: string
  autoHideDuration?: number
}

const SUCCESS_MESSAGE = 'Los cambios se realizaron exitosamente'
const ERROR_MESSAGE = 'Ubo un error. Intentalo nuevamente'

export const useMutationAlert = (params: Params) => {
  const {
    noErrorAlert = false,
    noSuccessAlert = false,
    noLoader = false,
    autoHideDuration = 5000,
    successMessage = SUCCESS_MESSAGE,
    errorMessage = ERROR_MESSAGE,
  } = params
  const { invalidateQueries } = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  const loader = useLoader()

  return {
    onSettled: () => !noLoader && loader.setIsLoading(true),
    onSuccess: () => {
      !noLoader && loader.setIsLoading(false)
      !noSuccessAlert && enqueueSnackbar({ message: successMessage, autoHideDuration, variant: 'success' })
      params.refreshKey && invalidateQueries({ queryKey: [params.refreshKey] })
    },
    onError: () => {
      !noLoader && loader.setIsLoading(false)
      !noErrorAlert && enqueueSnackbar({ message: errorMessage, autoHideDuration, variant: 'error' })
    },
  }
}

export default useMutationAlert
