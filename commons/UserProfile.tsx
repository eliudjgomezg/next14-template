'use client'

import { useEffect } from 'react'

import { Alert } from '@mui/material'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { FieldValues, useForm } from 'react-hook-form'

import { User } from 'definitions/types/User'
import { useUserMutation } from 'hooks/request/useUserQuery'
import useMutationAlert from 'hooks/useMutationAlert'
import useUserContext from 'hooks/useUserContext'
import Button from 'uikit/Button'
import InputField from 'uikit/Forms/InputField'

import PageSkeleton from './PageSkeleton'

const UserProfile = () => {
  const form = useForm()
  const { data: session, update: updateSession } = useSession()
  const { user, userRole } = useUserContext()

  const userMutation = useUserMutation()
  useMutationAlert({ mutation: userMutation })
  const formField = form.watch

  const updateUser = async (data: FieldValues) => {
    if (!user) return
    mutateUser(data)
  }

  const mutateUser = (body: Partial<User>) => {
    userMutation.mutate(
      { body, id: user?._id ?? '', method: 'PUT' },
      {
        onSuccess: async ({ response }) => {
          if (form.watch('password') && form.watch('repeat_password')) return signOut()
          await updateSession({ ...session, user: { ...user, ...response } })
          form.clearErrors()
        },
      }
    )
  }

  useEffect(() => {
    if (!user) return

    Object.entries(user).forEach(([key, value]) => {
      if (['is_disabled', 'created_at', 'password', '_id', 'role'].includes(key)) return
      form.setValue(key, value)
    })
  }, [user])

  if (!user) return <PageSkeleton />
  return (
    <form className="mb-14" onSubmit={form.handleSubmit(updateUser)}>
      <h1 className="font-bold">Mis datos personales</h1>

      {user.has_default_password && (
        <Alert className="mt-8" severity="warning">
          Hemos detectado que aun tienes la contraseña por default. Cambia tu contraseña para poder usar la aplicación.
        </Alert>
      )}
      <div className="mt-8 grid grid-cols-12 gap-4 lg:gap-8">
        <div className="col-span-12 grid grid-cols-12 gap-4 rounded-md border border-primary-color p-4 md:col-span-9">
          <div className="col-span-12 md:col-span-6">
            <InputField name="name" label="Nombre" className="w-full" inputProps={{ placeholder: 'Ingresa tu nombre' }} form={form} />
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputField
              name="last_name"
              label="Apellido"
              className="w-full"
              inputProps={{ className: 'w-full', placeholder: 'Ingresa tu apellido' }}
              form={form}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputField
              name="email"
              label="Correo electrónico"
              className="w-full"
              inputProps={{
                placeholder: 'Ingresa tu email',
                disabled: false,
              }}
              form={form}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputField name="phone" label="Teléfono" className="w-full" inputProps={{ placeholder: 'Ingresa tu teléfono' }} form={form} />
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputField
              name="password"
              label="Contraseña"
              className="w-full"
              inputProps={{
                type: 'password',

                placeholder: 'Ingresa tu nueva contraseña',
              }}
              options={{
                validate: () => {
                  if (formField('repeat_password') !== formField('password')) {
                    return 'Las contraseñas deben ser iguales'
                  }
                },
              }}
              form={form}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputField
              name="repeat_password"
              label="Confirmar contraseña"
              className="w-full"
              inputProps={{
                type: 'password',

                placeholder: 'Confirma tu contraseña',
              }}
              options={{
                validate: () => {
                  if (formField('repeat_password') !== formField('password')) {
                    return 'Las contraseñas deben ser iguales'
                  }
                },
              }}
              form={form}
            />
          </div>
          <div className="col-span-12 mt-8">
            <Button type="submit" className="ml-auto block">
              Guardar cambios
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default UserProfile
