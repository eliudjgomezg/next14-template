import { useState } from 'react'

export type TToggleActions<D = void, A = void> = {
  modalAction?: A
  modalData?: D
  defaultAction?: A
  defaultData?: D
}

export const useModal = <D, A = void>({ defaultData = undefined, defaultAction = undefined }: TToggleActions<D, A> = {}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [data, setData] = useState<D | undefined>(defaultData)
  const [action, setAction] = useState<A | undefined>(defaultAction)

  const toggle = ({ modalAction = undefined, modalData = undefined }: TToggleActions<D, A> = {}) => {
    setIsOpen(!isOpen)
    if (modalData !== data) setData(modalData)
    if (modalAction !== action) setAction(modalAction)
  }

  const updateAction = (dialogAction?: A) => {
    setAction(dialogAction ?? undefined)
  }

  const updateData = (dialogData?: D) => {
    setData(dialogData ?? undefined)
  }

  return { isOpen, data, action, toggle, updateAction, updateData }
}

export default useModal
