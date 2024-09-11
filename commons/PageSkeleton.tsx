import Skeleton from '@mui/material/Skeleton'

const PageSkeleton = () => {
  return (
    <div className="lesson-root overflow-hidden">
      <Skeleton className="mb-6 h-[80px] w-full rounded-3xl bg-gray-700" variant="rectangular" />
      {Array.from(Array(4).keys()).map((iter) => (
        <Skeleton key={iter} className="mt-2 w-full rounded-md bg-gray-700" variant="rectangular" />
      ))}
      <Skeleton className="my-6 h-[200px] w-full rounded-md bg-gray-700" variant="rectangular" />
      {Array.from(Array(3).keys()).map((iter) => (
        <Skeleton key={iter} className="mt-2 w-full rounded-md bg-gray-700" variant="rectangular" />
      ))}
      <Skeleton className="my-6 h-[200px] w-full rounded-md bg-gray-700" variant="rectangular" />
      {Array.from(Array(5).keys()).map((iter) => (
        <Skeleton key={iter} className="mt-2 w-full rounded-md bg-gray-700" variant="rectangular" />
      ))}
      {Array.from(Array(4).keys()).map((iter) => (
        <Skeleton key={iter} className="mt-2 w-full rounded-md bg-gray-700" variant="rectangular" />
      ))}
      <Skeleton className="my-6 h-[200px] w-full rounded-md bg-gray-700" variant="rectangular" />
      {Array.from(Array(3).keys()).map((iter) => (
        <Skeleton key={iter} className="mt-2 w-full rounded-md bg-gray-700" variant="rectangular" />
      ))}
      <Skeleton className="my-6 h-[200px] w-full rounded-md bg-gray-700" variant="rectangular" />
      {Array.from(Array(5).keys()).map((iter) => (
        <Skeleton key={iter} className="mt-2 w-full rounded-md bg-gray-700" variant="rectangular" />
      ))}
    </div>
  )
}

export default PageSkeleton
