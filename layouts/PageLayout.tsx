import { PropsWithChildren } from 'react'

const PageLayout = (props: PropsWithChildren) => {
  return <div className="mx-auto w-full xl:w-[1024px] 3xl:w-[1120px] 4xl:w-[1280px]">{props.children}</div>
}

export default PageLayout
