'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Alert } from '@mui/material'
import { useForm } from 'react-hook-form'

import { authenticate } from 'services/actions/authSession'

import logo from 'assets/images/brand/logo.png'
import { LoginBody } from 'definitions/types/Auth'
import useHandleSearchParams from 'hooks/useHandleSearchParams'
import useLoader from 'hooks/useLoader'
import InputField from 'uikit/Forms/InputField'

const inputStyles = 'bg-zinc-50 shadow-md text-black focus:outline-none'

const LoginForm = () => {
  const { getSearchParam } = useHandleSearchParams()
  const form = useForm<LoginBody>()
  const loader = useLoader()

  const [errorMessage, setErrorMessage] = useState('')
  const errorQueryParam = getSearchParam('error')

  const login = async (body: LoginBody) => {
    loader.setIsLoading(true)
    const sessionStatus = await authenticate(body)

    loader.setIsLoading(false)
    if (sessionStatus === 'success') return window.location.reload()
    setErrorMessage(sessionStatus)
  }

  useEffect(() => {
    if (errorQueryParam) setErrorMessage(errorQueryParam)
  }, [errorQueryParam])

  useEffect(() => {
    errorMessage && setErrorMessage('')
  }, [form.watch('email'), form.watch('password')])

  return (
    <section className="total-center h-svh">
      <div className="mx-auto w-full max-w-[450px] rounded-lg border-4 border-primary-color bg-white px-4 shadow-lg md:px-0">
        <div className="md:mx-6 md:p-12">
          <div className="mt-8 text-center">
            <Image className="mx-auto" width={200} src={logo} alt="logo" />
          </div>

          <form onSubmit={form.handleSubmit(login)}>
            <h6 className="mt-6 text-center font-normal text-black">
              Bienvenid@ al <span className="text-primary-color underline">Platform_name</span>, <br />
            </h6>

            <InputField
              name="email"
              className="mt-6 w-full"
              inputProps={{ className: inputStyles, placeholder: 'Correo electrónico' }}
              options={{ required: 'Este campo es requerido.' }}
              form={form}
            />

            <InputField
              name="password"
              className="mt-4 w-full"
              inputProps={{ className: inputStyles, type: 'password', placeholder: 'Contraseña' }}
              options={{ required: 'Este campo es requerido.' }}
              form={form}
            />

            <div className="my-12 py-1">
              <button
                className="shadow-dark-3 hover:shadow-dark-2 focus:shadow-dark-2 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong mb-3 inline-block w-full rounded-lg  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out focus:outline-none focus:ring-0"
                type="submit"
                data-twe-ripple-init
                data-twe-ripple-color="light"
                style={{ background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)' }}
              >
                Iniciar sesión
              </button>

              {/* <a className="text-black text-center" href="#!">
                Forgot password?
              </a> */}
              {errorMessage && (
                <Alert severity="error" className="mt-2">
                  {errorMessage}
                </Alert>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default LoginForm
