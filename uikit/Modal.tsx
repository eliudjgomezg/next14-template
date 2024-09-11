import { forwardRef, useEffect, useState } from 'react'

import { Dialog, Divider, Slide, styled } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'

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
  '& .css-1jdob15': { borderRadius: '1rem', backgroundColor: 'var(--black)', border: '1px solid var(--white)' },
  '& .css-uhb5lp': { borderRadius: '1rem', backgroundColor: 'var(--black)', border: '1px solid var(--white)' },
  '& .css-1qmc5dd': { borderRadius: '1rem', backgroundColor: 'var(--black)', border: '1px solid var(--white)' },
  '& .css-18i3v7t': { borderRadius: '1rem', backgroundColor: 'var(--black)', border: '1px solid var(--white)' },
  '& .css-hppdow': { borderRadius: '1rem', backgroundColor: 'var(--black)', border: '1px solid var(--white)' },
  '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': { borderRadius: '1rem', backgroundColor: 'var(--black)', border: '1px solid var(--white)' },
  '& .css-22jxwj-MuiPaper-root-MuiDialog-paper': { borderRadius: '1rem', backgroundColor: 'var(--black)', border: '1px solid var(--white)' },
  '& .css-12rl710-MuiPaper-root-MuiDialog-paper': { borderRadius: '1rem', backgroundColor: 'var(--black)', border: '1px solid var(--white)' },
  '& .css-1fu2e3p-MuiPaper-root-MuiDialog-paper': { borderRadius: '1rem', backgroundColor: 'var(--black)', border: '1px solid var(--white)' },
  '& .css-2rbg70-MuiPaper-root-MuiDialog-paper': { borderRadius: '1rem', backgroundColor: 'var(--black)', border: '1px solid var(--white)' },
  '& .css-m9glnp-MuiPaper-root-MuiDialog-paper': { backgroundColor: 'var(--black)' },
}))

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Modal = (props: ModalProps) => {
  const { headerColor = 'black' } = props
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
      TransitionComponent={Transition}
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
          style={{ backgroundColor: `var(--${String(headerColor)})` }}
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
    <div className="sticky bottom-0 z-[999999] w-full bg-black py-3 md:py-5">
      <Divider className="mb-3 bg-gray-500 md:mb-4" />
      <div className={`${props.className}`}>{props.children}</div>
    </div>
  )
}

Modal.Footer = Footer

export default Modal
