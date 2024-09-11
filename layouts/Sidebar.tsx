import Image from 'next/image'

import { Menu, MenuItem } from '@mui/material'

import { logOut } from 'services/actions/authSession'

import logo from 'assets/images/brand/logo.png'
import { SidebarOptions } from 'definitions/types/Dashboard'
import useMenu from 'hooks/useMenu'
import useUserContext from 'hooks/useUserContext'
import CustomLink from 'uikit/Forms/CustomLink'
import { cn } from 'utils/helpers'
import { routes } from 'utils/routes'

type SidebarProps = {
  sidebarOptions: SidebarOptions[]
}

const Sidebar = (props: SidebarProps) => {
  const { anchor, menu, openMenu, closeMenu } = useMenu()
  const { user } = useUserContext()

  return (
    <div className="sidebar-bg grid h-full grid-cols-[1fr] grid-rows-[150px_1fr_55px] py-4 lg:py-6">
      <figure className="total-center">
        <div>
          <Image src={logo} className="size-[150px] overflow-hidden object-cover" alt="avatar" />
        </div>
      </figure>

      <section className="no-scroll-bar overflow-auto">
        <div>
          <h5 className="user-name-color text-center font-bold underline">Hola {user?.name}</h5>
        </div>

        <ul className={cn('pt-4 mt-10 border-t border-zinc-500')}>
          {props.sidebarOptions.map((option, index) => {
            return (
              <li key={index}>
                <CustomLink
                  href={option.href}
                  className={cn('grid grid-cols-[25px_1fr] items-center rounded-md gap-2 px-3 py-2.5 mt-1 mx-4 xl:hover:bg-gray-500', {
                    'bg-primary-color xl:hover:bg-primary-color': option.isSelected,
                  })}
                >
                  {option.icon}
                  <span className={cn('text-white', { 'font-bold': option.isSelected })}>{option.title}</span>
                </CustomLink>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="self-end">
        <p className="cursor-pointer text-center font-bold text-white underline" onClick={openMenu}>
          Cerrar sesión
        </p>

        <Menu className="-mt-14 ml-5" anchorEl={anchor} open={menu} onClose={closeMenu}>
          <MenuItem className="subtitle1 px-12" onClick={() => logOut(routes.signIn.path)}>
            Salir
          </MenuItem>
        </Menu>
      </section>
    </div>
  )
}

export default Sidebar
