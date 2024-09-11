import { PropsWithChildren } from 'react'

import { SidebarOptions } from 'definitions/types/Dashboard'

import MobileHeader from './MobileHeader'
import MobileNavbar from './MobileNavbar'
import Sidebar from './Sidebar'

type DashboardProps = {
  sidebarOptions: SidebarOptions[]
}

const Dashboard = (props: DashboardProps & PropsWithChildren) => {
  return (
    <div className="grid h-svh grid-cols-[1fr] lg:grid-cols-[205px_1fr] 3xl:grid-cols-[210px_1fr] xl:grid-rows-[1fr] grid-rows-[70px_1fr_50px]">
      <aside className="h-full hidden overflow-hidden border-r-4 border-primary-color lg:block">
        <Sidebar sidebarOptions={props.sidebarOptions} />
      </aside>
      <header className="lg:hidden block">
        <MobileHeader />
      </header>

      <main id="dashboard" className="h-full overflow-y-auto overflow-x-hidden p-4 md:p-6 xl:p-8">
        {props.children}
      </main>

      <nav className="block border-t border-primary-color py-1 lg:hidden px-2">
        <MobileNavbar sidebarOptions={props.sidebarOptions} />
      </nav>
    </div>
  )
}

export default Dashboard
