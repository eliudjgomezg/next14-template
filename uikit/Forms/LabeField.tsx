import { cn } from 'utils/helpers'

import { GenericInputProps } from './GenericInput'

const LabeField = (props: GenericInputProps) => {
  return (
    <>
      {props.label && (
        <label className={cn('subtitle1 block text-white', props.labelClassName ?? '')} htmlFor={props.id ?? props.name}>
          {props.label}
        </label>
      )}
    </>
  )
}

export default LabeField
