import { useEffect, useState } from 'react'

import { Dialog, Divider, styled } from '@mui/material'

import { Colors } from 'definitions/types/Colors'
import { cn } from 'utils/helpers'

type ModalProps = {
  children: React.ReactNode | React.ReactNode[]
  open: boolean
  title?: string
  fullScreen?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
  headerColor?: Colors
  noContainerSpacing?: boolean
  noHeader?: boolean
  onClose?: () => void
}

type TFooter = {
  children: React.ReactNode | React.ReactNode[]
  className?: string
}

const CustomDialog = styled(Dialog)(() => ({
  '& .MuiDialog-paper': { borderRadius: '1rem', backgroundColor: 'var(--black)', border: '1px solid var(--white)' },
}))

const Modal = (props: ModalProps) => {
  const { headerColor = 'white' } = props
  const fullScreenStyles = props.fullScreen ? 'bg-black text-white' : 'rounded-t-[1rem]'
  const modalPadding = props.noContainerSpacing ? '' : 'md:px-6 px-4 md:pt-6 pt-4'
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isChildrenOpen, setIsChildrenOpen] = useState(false)

  const handleRender = (isOpen: boolean) => {
    let timeout: NodeJS.Timeout

    if (props.open) {
      setIsChildrenOpen(isOpen)
      return (timeout = setTimeout(() => {
        setIsModalOpen(isOpen)
      }, 100))
    }

    setIsModalOpen(isOpen)
    timeout = setTimeout(() => {
      setIsChildrenOpen(isOpen)
    }, 300)

    return timeout
  }

  useEffect(() => {
    const renderTimeout = handleRender(props.open)

    return () => clearTimeout(renderTimeout)
  }, [props.open])

  return (
    <CustomDialog
      open={isModalOpen}
      keepMounted
      disableEnforceFocus
      maxWidth={props.size ?? 'sm'}
      fullScreen={props.fullScreen}
      sx={{ maxHeight: props.fullScreen ? '100vh' : '95vh', overflow: 'hidden' }}
      onClose={props.onClose}
    >
      {!props.noHeader && (
        <div
          className={cn(`flex h-12 items-center bg-white px-4 py-3 md:px-6`, fullScreenStyles)}
          style={{ backgroundColor: `var(--${headerColor})` }}
        >
          <h4>{props.title}</h4>
        </div>
      )}

      <div className={`no-mobile-scroll-bar bg-blur h-full overflow-y-auto overflow-x-hidden text-white ${modalPadding}`}>
        {isChildrenOpen && props.children}
      </div>
    </CustomDialog>
  )
}

export const Footer = (props: TFooter) => {
  return (
    <div className="sticky bottom-0 z-[999999] w-full bg-black py-3 md:py-5 mt-px">
      <Divider className="mb-3 bg-gray-500 md:mb-4" />
      <div className={`${props.className}`}>{props.children}</div>
    </div>
  )
}

Modal.Footer = Footer

export default Modal
