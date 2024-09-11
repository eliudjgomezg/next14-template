import { ImageProps as NextImageProps } from 'next/image'
import { getImageProps } from 'next/image'

import { twMerge } from 'tailwind-merge'

// Define la interfaz manualmente
interface ImageProps {
  url: string
  width: number
  height: number
  title?: string
  nextImageProps?: Omit<NextImageProps, 'src' | 'alt'>
}

export const CtfPicture = ({ url, width, height, title, nextImageProps }: ImageProps) => {
  if (!url || !width || !height) return null

  const common_high = {
    alt: title || '',
    width: width,
    height: height,
    priority: nextImageProps?.priority,
    className: twMerge(nextImageProps?.className, 'transition-all'),
  }
  const common_medium = {
    alt: title || '',
    width: 800,
    height: 500,
    className: twMerge(nextImageProps?.className, 'transition-all'),
  }

  const common_low = {
    alt: title || '',
    width: 300,
    height: 200,
    className: twMerge(nextImageProps?.className, 'transition-all'),
  }

  const {
    props: { srcSet: high },
  } = getImageProps({
    ...common_high,
    src: url,
    priority: nextImageProps?.priority,
  })

  const {
    props: { srcSet: medium },
  } = getImageProps({
    ...common_medium,
    src: url,
    priority: nextImageProps?.priority,
  })

  const {
    props: { srcSet: low, ...rest },
  } = getImageProps({
    ...common_low,
    src: url,
    priority: nextImageProps?.priority,
  })

  return (
    <picture>
      <source media="(max-width: 740px)" srcSet={low} />
      <source media="(max-width: 980px)" srcSet={medium} />
      <source media="(min-width: 1280px)" srcSet={medium} />
      <source media="(min-width: 1480px)" srcSet={high} />
      <img alt={title || ''} {...rest} />
    </picture>
  )
}
