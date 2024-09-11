'use client'

import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'

import AccountBoxIcon from '@mui/icons-material/AccountBox'
import HomeIcon from '@mui/icons-material/Home'

import { routes } from 'utils/routes'

import Dashboard from './Dashboard'
import PageLayout from './PageLayout'

const AdminLayout = (props: PropsWithChildren) => {
  const pathname = usePathname()

  const sidebarOptions = [
    {
      title: 'Home',
      href: routes.adminHome.path,
      isSelected: pathname.includes(routes.adminHome.path),
      icon: <HomeIcon className="text-white" />,
    },
    {
      title: 'Perfil',
      href: routes.adminProfile.path,
      isSelected: pathname.includes(routes.adminProfile.path),
      icon: <AccountBoxIcon className="text-white" />,
    },
  ]

  return (
    <Dashboard sidebarOptions={sidebarOptions}>
      <PageLayout>{props.children}</PageLayout>
    </Dashboard>
  )
}

export default AdminLayout
