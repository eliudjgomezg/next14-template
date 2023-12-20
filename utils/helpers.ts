import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

type ExpandRecursively<T> = T extends object ? (T extends infer O ? { [K in keyof O]: ExpandRecursively<O[K]> } : never) : T
type RemoveNull<T> = ExpandRecursively<{ [K in keyof T]: Exclude<RemoveNull<T[K]>, null> }>

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

export const buildQuery = (query: Record<string, unknown>): string => {
  const cleanQuery = removeEmptyValues(query)
  const params = Object.entries(cleanQuery).map(([key, value]) => `${key}=${JSON.stringify(value)}`)
  return `?${params.join('&')}`
}

export function removeEmptyValues<T>(obj: T): RemoveNull<T> {
  return Object.fromEntries(
    Object.entries(obj as unknown as RemoveNull<T>)
      .filter((v) => v[1] !== '')
      .map(([k, v]) => [k, v === Object(v) ? removeEmptyValues(v) : v])
  ) as RemoveNull<T>
}
