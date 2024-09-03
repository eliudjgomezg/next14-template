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
  const parsedQuery = Object.entries(query).reduce((acc, [key, value]) => {
    return acc = acc + `${key}=${JSON.stringify(value)}`
  }, '')
  return `?${parsedQuery}`
}

export function removeEmptyValues<T>(obj: T): RemoveNull<T> {
  return Object.fromEntries(
    Object.entries(obj as unknown as RemoveNull<T>)
      .filter((v) => v[1] !== '')
      .map(([k, v]) => [k, v === Object(v) ? removeEmptyValues(v) : v])
  ) as RemoveNull<T>
}

export const cleanString = (string: string) => {
  return string
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replaceAll(' ', '')
}

export const cleanRut = (rut: string) => {
  return typeof rut === 'string' ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase() : ''
}

export const validateRut = (rut: string) => {
  if (typeof rut !== 'string') {
    return false
  }
  if (!/^0*(\d{1,3}(\.?\d{3})*)-?([\dkK])$/.test(rut)) {
    return false
  }

  rut = cleanRut(rut)

  let t = parseInt(rut.slice(0, -1), 10)
  let m = 0
  let s = 1

  while (t > 0) {
    s = (s + (t % 10) * (9 - (m++ % 6))) % 11
    t = Math.floor(t / 10)
  }

  const v = s > 0 ? '' + (s - 1) : 'K'
  return v === rut.slice(-1)
}

export const formatRut = (rut: string) => {
  rut = cleanRut(rut)
  let result = rut ? rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1) : ''
  for (let i = 4; i < rut.length; i += 3) {
    result = rut.slice(-3 - i, -i) + '.' + result
  }

  return result
}

export const isOdd = (number: number) => {
  return (number + 1) % 2 === 0
}

export const sortByString = <T>(a: T, b: T, field?: keyof T) => {
  const atoString = cleanString(typeof a === 'object' && field ? String((a as T)[field]) : (a as unknown as string))
  const btoString = cleanString(typeof b === 'object' && field ? String((b as T)[field]) : (b as unknown as string))

  if (atoString < btoString) return -1
  if (atoString > btoString) return 1
  return 0
}

export const parseVideoUrl = (url: string) => {
  if (!url.includes('youtu')) return url
  if (url.includes('embed')) return url
  const id = url.slice(17, url.length)
  return `https://www.youtube.com/embed/${id}`.replace('?t=', '?start=')
}

export const scrollToTop = (elementId?: string) => {
  const element = document.getElementById(elementId ?? 'dashboard') as HTMLElement

  if (!element) return
  element.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
}

export const calcAverage = (amount: number, total: number) => {
  if (!total || !amount) return 0
  const average = (amount * 100) / total
  return Math.ceil(average)
}

export const lastDotToDecimal = (number: string | number) => {
  const numberToString = number.toString()
  if (!numberToString.includes('.')) return numberToString
  return numberToString.replace(/.([^.]*)$/, ',$1')
}
