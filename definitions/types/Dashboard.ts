import { ReactNode } from "react"

export type SidebarOptions = {
  title: string
  href: string
  isSelected: boolean
  icon: ReactNode
}

export type Sidebar = SidebarOption & {
  subOptions: SidebarOption[]
}

export type SidebarOption = {
  title: () => JSX.Element
}