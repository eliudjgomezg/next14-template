'use client'

import { SidebarOptions } from 'definitions/types/Dashboard'
import CustomLink from 'uikit/Forms/CustomLink'
import { cn } from 'utils/helpers'

type MobileNavbarProps = {
  sidebarOptions: SidebarOptions[]
}

const MobileNavbar = (props: MobileNavbarProps) => {
  return (
    <>
      <ul className="flex h-full justify-between gap-4">
        {props.sidebarOptions.map((option) => {
          return (
            <li key={option.title} className="grow">
              <CustomLink href={option.href} className={cn('total-center flex-col h-full rounded-md', { 'bg-primary-color': option.isSelected })}>
                {option.icon}
              </CustomLink>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default MobileNavbar
