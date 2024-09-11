import FormError from './FormError'
import { GenericInputProps } from './GenericInput'
import GenericSelect, { GenericSelectProps } from './GenericSelect'
import LabeField from './LabeField'

const SelectField = (props: GenericSelectProps & GenericInputProps) => {
  const { showErrorMessage = true } = props

  return (
    <div className={`inline-block ${props.className}`}>
      <LabeField {...props} />
      <GenericSelect {...props} inputProps={{ ...props.inputProps }} />
      {showErrorMessage && <FormError name={props.name} errors={props.form?.formState?.errors} />}
    </div>
  )
}

export default SelectField
