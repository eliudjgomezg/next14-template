'use client'

import { ReactNode } from 'react'

import dayjs from 'dayjs'
import { SnackbarProvider } from 'notistack'

import 'dayjs/locale/es-mx'

dayjs.locale('es-mx')

const SnackBarProvider = (props: { children: ReactNode }) => {
  return (
    <SnackbarProvider autoHideDuration={5000} disableWindowBlurListener>
      {props.children}
    </SnackbarProvider>
  )
}

export default SnackBarProvider
