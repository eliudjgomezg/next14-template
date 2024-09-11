'use client'

import { useState } from 'react'

const useMenu = () => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null)
  const menu = Boolean(anchor)

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget)
  }
  const closeMenu = () => {
    setAnchor(null)
  }
  return { anchor, menu, openMenu, closeMenu }
}

export default useMenu
