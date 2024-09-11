'use client'

import React, { ElementType, ReactNode } from 'react'

import { Button as MuiButton } from '@mui/material'

import { Colors } from 'definitions/types/Colors'
import { cn } from 'utils/helpers'

export type Rounded = 'small' | 'medium' | 'large' | 'full'
export type ButtonVariant = 'contained' | 'outlined' | 'default'
export type ButtonSize = 'small' | 'medium' | 'large'
type UiButton = {
  /**
   * Define el estilo del container del botón.
   * @default  'contained'
   */
  variant?: 'contained' | 'outlined' | 'default'
  /**
   * Define la altura del botón.
   * @default  'medium'
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Determina la cantidad de border radius del botón.
   * @default  'medium'
   */
  rounded?: 'small' | 'medium' | 'large' | 'full'
  /**
   * Define el color del botón según el variant asignado.
   * @default  'white'
   */
  color?: Colors
  /**
   * Define el color del texto del botón.
   * @default  'white'
   */
  textColor?: Colors
  /**
   * Permite agregar el spinner "cargando".
   * @default  'false'
   */
  loading?: boolean
  /**
   * Permite desactivar las interacciones del botón.
   * @default  'false'
   */
  disabled?: boolean
  /**
   * Define el estilo del container del botón.
   * @default  'button'
   */
  type?: 'submit' | 'button' | 'reset'
  /**
   * Permite agregar de clases css.
   */
  className?: string
  component?: ElementType
  children?: ReactNode | ReactNode[]
  /**
   * Permite designar una función al evento "onClick".
   */
  onClick?: () => void
}

const structure = `transition duration-200 min-w-4`
const defaultSx = {
  borderStyle: 'solid',
}

const roundedStyle = (rounded: Rounded) => {
  const dispatch = {
    small: '4px',
    medium: '8px',
    large: '12px',
    full: '9999px',
  }
  return dispatch[rounded]
}

/**
 * Props del componente
 *   @prop variant?: 'contained' | 'outlined' | 'default'
 *   @prop size?: 'small' | 'medium' | 'large'
 *   @prop rounded?: 'small' | 'medium' | 'large' | 'full'
 *   @prop color?: Colors
 *   @prop textColor?: Colors
 *   @prop iconColor?: Colors
 *   @prop loading?: boolean
 *   @prop disabled?: boolean
 *   @prop type?: 'submit' | 'button' | 'reset'
 *   @prop className?: string
 *   @prop onClick?: () => void
 */
export const Button = (props: UiButton) => {
  const {
    children,
    className,
    variant = 'contained',
    loading,
    disabled = false,
    color = 'primary-color',
    rounded = 'medium',
    textColor,
    ...rest
  } = props

  const buttonPadding = {
    paddingLeft: '16px',
    paddingRight: '16px',
  }

  const sx = { ...defaultSx, ...buttonPadding, borderRadius: roundedStyle(rounded) }

  const selectedTextColor = () => {
    if (variant === 'contained') return textColor ? `var(--${textColor})` : 'var(--white)'
    return textColor ? `var(--${textColor})` : `var(--${color})`
  }

  const style = () => {
    if (disabled)
      return {
        backgroundColor: 'var(--gray-200)',
        color: 'var(--gray-400)',
        border: 'none',
        boxShadow: 'none',
        cursor: 'not-allowed',
      }

    return {
      backgroundColor: variant === 'contained' ? `var(--${color})` : 'var(--transparent)',
      color: selectedTextColor(),
      border: variant === 'default' ? `none` : props.disabled ? `1px solid var(--gray-00)` : `1px solid var(--${color})`,
      boxShadow: props.disabled || variant === 'default' ? 'none' : `var(--shadow-md)`,
    }
  }

  const onClick = () => {
    props?.onClick && props.onClick()
  }

  return (
    <span className={`${props?.disabled ? 'cursor-not-allowed' : ''}`}>
      <MuiButton
        className={cn(structure, { 'xl:hover:opacity-70': !disabled }, className ?? '')}
        {...rest}
        sx={sx}
        style={{ ...style() }}
        disabled={disabled}
        onClick={onClick}
      >
        {React.isValidElement(children) ? (
          <span className="normal-case leading-none">{children}</span>
        ) : (
          <p className="mt-0.5 font-semibold normal-case leading-none">{children}</p>
        )}
      </MuiButton>
    </span>
  )
}

export default Button
