import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react'

import { UseFormReturn, RegisterOptions } from 'react-hook-form'

import { cn } from 'utils/helpers'

type TVariant = 'default' | 'outlined' | 'transparent'

export type GenericInputProps = {
  name: string
  label?: string
  labelClassName?: string
  showErrorMessage?: boolean
  id?: string
  textarea?: boolean
  variant?: TVariant
  form: UseFormReturn<any>
  options?: RegisterOptions
  className?: string
  inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  textareaProps?: DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
}

export function inputStyle(variant: TVariant) {
  if (variant === 'transparent') return ''
  if (variant === 'default') return 'border-b border-gray-500 pl-0 pr-4'
  return 'bg-zinc-800 rounded-lg px-4 border-none'
}

const GenericInput = (props: GenericInputProps) => {
  const disabledStyle = props?.inputProps?.disabled ? 'opacity-30 text-black cursor-not-allowed px-4' : inputStyle(props.variant ?? 'outlined')

  if (props.textarea)
    return (
      <textarea
        {...props.textareaProps}
        {...props.form.register(props.name, props.options)}
        className={cn(
          'text-white transparent w-full',
          { 'py-2': props.variant !== 'transparent' },
          disabledStyle,
          props.textareaProps?.className ?? ''
        )}
        id={props.id ?? props.name}
      />
    )
  return (
    <input
      {...props.inputProps}
      {...props.form.register(props.name, props.options)}
      className={cn('h-9 text-white w-full focus:outline-none md:h-10 mt-1', disabledStyle, props.inputProps?.className ?? '')}
      style={{ width: '100%' }}
      id={props.id ?? props.name}
    />
  )
}

export default GenericInput
