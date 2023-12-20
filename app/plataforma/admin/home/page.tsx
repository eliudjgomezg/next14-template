'use client'

import Link from 'next/link'

import { signOut } from 'next-auth/react'

import { routes } from 'utils/routes'

const AdminHomePage = () => {
  return (
    <div>
      <h1>Admin Home</h1>
      <Link href={routes.home.path}>Ir alHome</Link>
      <button className="bg-white text-black mx-auto my-12 block" onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  )
}

export default AdminHomePage
