import Image from 'next/image'

import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded'
import { Menu, MenuItem } from '@mui/material'

import { logOut } from 'services/actions/authSession'

import logo from 'assets/images/brand/logo.png'
import useMenu from 'hooks/useMenu'
import useUserContext from 'hooks/useUserContext'
import { routes } from 'utils/routes'

const MobileHeader = () => {
  const { anchor, menu, openMenu, closeMenu } = useMenu()
  const { user } = useUserContext()

  if (!user) return null
  return (
    <div className="flex justify-between border-b border-primary-color items-center h-full w-full md:px-5 px-3 md:h-20">
      <figure>
        <div className="grid md:grid-cols-[65px_1fr] grid-cols-[55px_1fr]">
          <div className="md:w-14 w-12 md:h-14 h-12 rounded-full total-center">
            <Image src={logo} className="size-14 overflow-hidden object-cover" alt="avatar" />
          </div>
          <div className="self-center">
            <h6>Hola {user.name}!</h6>
          </div>
        </div>
      </figure>

      <button className="md:h-12 md:w-12 h-9 w-9 rounded-full bg-primary-color total-center cursor-pointer" onClick={openMenu}>
        <ExitToAppRoundedIcon className="text-white" />
      </button>
      <Menu className="-mt-14 ml-5" anchorEl={anchor} open={menu} onClose={closeMenu}>
        <MenuItem className="subtitle1 px-12" onClick={() => logOut(routes.signIn.path)}>
          Salir
        </MenuItem>
      </Menu>
    </div>
  )
}

export default MobileHeader
