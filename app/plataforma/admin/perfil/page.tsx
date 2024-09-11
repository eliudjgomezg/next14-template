import { Metadata, NextPage } from 'next'

import UserProfile from 'commons/UserProfile'

export const metadata: Metadata = {
  title: 'Cuenta',
}

const AdminProfilePage: NextPage = () => {
  return <UserProfile />
}

export default AdminProfilePage
