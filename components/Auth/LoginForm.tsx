'use client'

import { signIn } from 'next-auth/react'

const LoginForm = () => {
  const signInForm = async () => {
    await signIn('credentials', { email: 'eliud@gmail.com', password: '123' })
  }

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="space-y-3">
          <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
            <h1 className={`mb-3 text-2xl text-black`}>Iniciar sesión</h1>
            <div className="w-full">
              <div>
                <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md text-black border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Ingresa tu correo"
                    required
                  />
                  <p>O</p>
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border text-black border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Ingresa tu contraseña"
                    required
                    minLength={6}
                  />
                  <p>O</p>
                </div>
              </div>
            </div>
            <button className="bg-black text-white mx-auto my-12 p-8 w-full" onClick={signInForm}>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginForm
