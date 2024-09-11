import { useEffect } from 'react'

import { formatRut, validateRut } from 'utils/helpers'

import FormError from './FormError'
import GenericInput, { GenericInputProps } from './GenericInput'
import LabeField from './LabeField'

const RutField = (props: GenericInputProps) => {
  useEffect(() => {
    props.form.setValue(props.name, formatRut(props.form.watch(props.name) ?? ''))
  }, [props.form.watch(props.name)])

  return (
    <div className={`${props.className ?? ''}`} style={{ display: 'inline-block' }}>
      <LabeField {...props} />
      <GenericInput
        {...props}
        inputProps={{ ...props.inputProps }}
        options={{
          ...props.options,
          validate: () => {
            if (!validateRut(props.form.watch(props.name))) return 'Rut inválido'
          },
        }}
      />
      <FormError name={props.name} errors={props.form?.formState?.errors} />
    </div>
  )
}

export default RutField
