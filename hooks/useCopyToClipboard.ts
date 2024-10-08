import { useSnackbar } from 'notistack'

export const useCopyToClipboard = () => {
  const snackbar = useSnackbar()

  const clipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    snackbar.enqueueSnackbar('Copiado al portapapeles.', { variant: 'success' })
  }

  return { clipboard }
}
