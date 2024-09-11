'use client'

import { useEffect } from 'react'

import { logOut } from 'services/actions/authSession'

import { QueryError } from 'definitions/types/Request'
import useLoader from 'hooks/useLoader'
import { defaultQueryClient } from 'providers/TanstackProvider'
import Button from 'uikit/Button'
import { routes } from 'utils/routes'

type ErrorBoundaryMessageProps = {
  error: Error & {
    digest?: string
  }
}

const ErrorBoundaryMessage = (props: ErrorBoundaryMessageProps) => {
  const loader = useLoader()
  const errorCode = (props.error as unknown as QueryError).statusCode

  useEffect(() => {
    loader.setIsLoading(false)
    if (errorCode === 401) {
      defaultQueryClient.clear()
      logOut(routes.signIn.path)
    }
  }, [])

  if (errorCode === 401) {
    return (
      <ErrorMessage
        message="Tu sesión ha expirado, debes volver a iniciar sesión."
        buttonText="Ir a iniciar sesión"
        handleClick={() => logOut(routes.signIn.path)}
      />
    )
  }
  return (
    <ErrorMessage
      message="Ha ocurrido un error. Vuelve a intentarlo o visita otra pagina de la plataforma. También puedes reportarlo con un administrador."
      buttonText="Intentalo nuevamente"
      handleClick={() => window.location.reload()}
    />
  )
}

export default ErrorBoundaryMessage

export type ErrorMessageProps = {
  message: string
  buttonText: string
  handleClick: () => void
}

const ErrorMessage = (props: ErrorMessageProps) => {
  return (
    <div className="total-center flex-col p-4 md:p-12">
      <h1 className="text-center">{props.message}</h1>
      <Button className="mt-4" onClick={props.handleClick}>
        {props.buttonText}
      </Button>
    </div>
  )
}
