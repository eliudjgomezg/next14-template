import { FieldErrors } from 'react-hook-form'

type FormErrorProps = {
  name: string
  errorClassName?: string
  errors: FieldErrors<Record<string, string>>
}

const FormError = (props: FormErrorProps) => {
  const errors = props?.errors[props.name]
  return <>{errors?.message && <p className={`body1 mt-0.5 flex items-center text-red-600 ${props.errorClassName}`}>{errors?.message}</p>}</>
}

export default FormError
