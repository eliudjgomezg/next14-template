import { useMediaQuery } from '@mui/material'

import { Colors } from 'definitions/types/Colors'
import Button from 'uikit/Button'
import Modal from 'uikit/Modal'
import { cn } from 'utils/helpers'

type TModalFooter = {
  acceptButton?: TButton
  cancelButton?: TButton
  justifyContent?: 'start' | 'center' | 'end' | 'between'
  className?: string
}

type TButton = {
  text?: string
  color?: Colors
  size?: 'large' | 'medium' | 'small'
  variant?: 'contained' | 'outlined' | 'default'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: () => void
}

const ModalFooter = (props: TModalFooter) => {
  const { justifyContent = 'end' } = props
  const isDesktopTablet = useMediaQuery('(min-width: 768px)')

  return (
    <Modal.Footer className={props.className ?? ''}>
      <div className="flex gap-x-4 gap-y-1" style={{ justifyContent, flexDirection: isDesktopTablet ? 'row' : 'column' }}>
        {isDesktopTablet ? (
          <>
            {props.cancelButton && (
              <Button
                className={cn('w-fit')}
                variant={props?.cancelButton?.variant ?? 'outlined'}
                color={props?.cancelButton?.color ?? 'white'}
                size={props?.cancelButton?.size}
                type={props?.cancelButton?.type ?? 'button'}
                disabled={props?.cancelButton.disabled}
                onClick={props?.cancelButton?.onClick}
              >
                {props?.cancelButton?.text ?? 'Cerrar'}
              </Button>
            )}
            {props.acceptButton && (
              <Button
                className={cn('w-fit')}
                variant={props?.acceptButton?.variant ?? 'contained'}
                color={props?.acceptButton?.color ?? 'white'}
                textColor="black"
                size={props?.acceptButton?.size}
                type={props?.acceptButton?.type ?? 'button'}
                disabled={props?.acceptButton.disabled}
                onClick={props?.acceptButton?.onClick}
              >
                {props?.acceptButton?.text ?? 'Aceptar'}
              </Button>
            )}
          </>
        ) : (
          <>
            {props.acceptButton && (
              <Button
                className={cn('w-full')}
                variant={props?.acceptButton?.variant ?? 'contained'}
                color={props?.acceptButton?.color ?? 'white'}
                textColor="black"
                size={props?.acceptButton?.size}
                type={props?.acceptButton?.type ?? 'button'}
                disabled={props?.acceptButton.disabled}
                onClick={props?.acceptButton?.onClick}
              >
                {props?.acceptButton?.text ?? 'Aceptar'}
              </Button>
            )}
            {props.cancelButton && (
              <Button
                className={cn('w-full mt-3')}
                variant={props?.cancelButton?.variant ?? 'outlined'}
                color={props?.cancelButton?.color ?? 'white'}
                size={props?.cancelButton?.size}
                type={props?.cancelButton?.type ?? 'button'}
                disabled={props?.cancelButton.disabled}
                onClick={props?.cancelButton?.onClick}
              >
                {props?.cancelButton?.text ?? 'Cerrar'}
              </Button>
            )}
          </>
        )}
      </div>
    </Modal.Footer>
  )
}

export default ModalFooter
