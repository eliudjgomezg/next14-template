import { RegisterOptions } from 'react-hook-form'

import FormError from './FormError'
import GenericInput, { GenericInputProps } from './GenericInput'
import LabeField from './LabeField'

const InputField = (props: GenericInputProps) => {
  const { showErrorMessage = true, options, ...rest } = props
  const editedOptions =
    props.inputProps?.type === 'tel'
      ? {
          ...options,
          pattern: {
            value: /^[0-9+]*$/,
            message: 'Solo se permiten números y +',
          },
        }
      : { ...options }

  return (
    <div className={`${props.className ?? ''}`} style={{ display: 'inline-block' }}>
      <LabeField {...rest} />
      <GenericInput {...rest} options={{ ...(editedOptions as RegisterOptions) }} inputProps={{ ...props.inputProps }} />
      {showErrorMessage && <FormError name={props.name} errors={props.form?.formState?.errors} />}
    </div>
  )
}

export default InputField
