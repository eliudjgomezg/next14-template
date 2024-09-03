import { usePathname, useRouter, useSearchParams } from "next/navigation"

const useHandleSearchParams = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const urlParams = new URLSearchParams(searchParams)

  const getSearchParam = (searchParam: string) => {
    return searchParams.get(searchParam)
  }

  const setSearchParam = (searchParam: string, value: string) => {
    setTimeout(() => {
      urlParams.set(searchParam, value)
      replace(`${pathname}?${urlParams.toString()}`)
    }, 50);
  }

  const deleteSearchParam = (searchParam: string) => {
    urlParams.delete(searchParam)
    replace(`${pathname}?${urlParams.toString()}`)
  }

  return { searchParams, urlParams, getSearchParam, setSearchParam, deleteSearchParam }
}

export default useHandleSearchParams