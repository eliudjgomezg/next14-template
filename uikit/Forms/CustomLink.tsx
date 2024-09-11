import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import { UrlObject } from 'url'

type Url = string | UrlObject
type CustomLinkProps = {
  href: Url
  as?: Url
  replace?: boolean
  scroll?: boolean
  shallow?: boolean
  passHref?: boolean
  prefetch?: boolean
  locale?: string | false
  legacyBehavior?: boolean
  className?: string
  onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>
  onTouchStart?: React.TouchEventHandler<HTMLAnchorElement>
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

const CustomLink = (props: CustomLinkProps & PropsWithChildren) => {
  return (
    <Link {...props} prefetch={true}>
      {props.children}
    </Link>
  )
}

export default CustomLink
