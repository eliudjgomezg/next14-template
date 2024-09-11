import { useId } from 'react'

import { cn } from 'utils/helpers'

type SwitchField = {
  checked: boolean
  label?: string
  className?: string
  labelClassName?: string
  labelPosition?: 'left' | 'right' | 'top' | 'bottom'
  onChange: (e: boolean) => void
}

const SwitchField = (props: SwitchField) => {
  const { labelPosition = 'left' } = props
  const id = useId()

  return (
    <span className={props.className ?? ''}>
      <span className={cn('flex flex-row items-center', { 'gap-2': props.label }, { 'flex-col': ['top', 'bottom'].includes(labelPosition) })}>
        <p className={cn('order-1 body1', { 'order-2': ['right', 'bottom'].includes(labelPosition) }, props.labelClassName ?? '')}>{props.label}</p>
        <label
          className={cn(
            'relative inline-flex cursor-pointer items-center order-2',
            { 'order-1': ['right', 'bottom'].includes(labelPosition) },
            props.labelClassName ?? ''
          )}
        >
          <input id={id} type="checkbox" checked={props.checked} className="peer sr-only" onChange={(e) => props.onChange(e.target.checked)} />
          <label htmlFor={id} className="hidden" />
          <div
            className={cn(
              "peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-400 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-color peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"
            )}
          />
        </label>
      </span>
    </span>
  )
}

export default SwitchField
