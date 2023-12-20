'use client'

import { ReactNode } from 'react'

import { SnackbarProvider } from 'notistack'

const SnackBarProvider = (props: { children: ReactNode }) => {
  return (
    <SnackbarProvider autoHideDuration={5000} disableWindowBlurListener>
      {props.children}
    </SnackbarProvider>
  )
}

export default SnackBarProvider
