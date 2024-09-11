import { cn } from 'utils/helpers'

import { GenericInputProps } from './GenericInput'

export type SelectedOption = {
  value: string | number
  label: string | number | undefined
}

export type GenericSelectProps = {
  selectOptions?: SelectedOption[]
  withoutDefaultValue?: boolean
  label?: string
  inputProps?: React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
}

const GenericSelect = (props: GenericSelectProps & GenericInputProps) => {
  const disabledStyle = props?.inputProps?.disabled ? 'bg-gray-500 border-none px-2' : inputStyle()

  function inputStyle() {
    if (props.variant === 'transparent') return 'px-2'
    if (props.variant === 'default') return 'border-b border-gray-500 pl-1 pr-6'
    return 'border-none bg-zinc-800 rounded-lg pl-4 pr-8'
  }

  return (
    <select
      {...props.form.register(props.name, props.options)}
      className={cn('custom-select subtitle1 h-9 w-full bg-transparent focus:outline-none md:h-10', disabledStyle, props.inputProps?.className ?? '')}
      disabled={props?.inputProps?.disabled}
      id={props.id ?? props.name}
    >
      {!props.withoutDefaultValue && (
        <option className="text-white" value="">
          Selecciona una opción
        </option>
      )}
      {props.selectOptions?.map((option) => (
        <option className="text-white" key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default GenericSelect
