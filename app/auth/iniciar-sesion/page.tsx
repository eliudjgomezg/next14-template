import { Metadata, NextPage } from 'next'

import LoginForm from 'components/Auth/LoginForm'

export const metadata: Metadata = {
  title: 'Iniciar sesión',
}

const LoginPage: NextPage = () => {
  return <LoginForm />
}

export default LoginPage
