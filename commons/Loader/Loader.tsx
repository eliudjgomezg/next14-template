import { Backdrop, CircularProgress } from '@mui/material'

export const Loader = (props: { isOpen: boolean }) => {
  return (
    <Backdrop open={props.isOpen} sx={{ zIndex: 999999 }}>
      <CircularProgress color="secondary" />
    </Backdrop>
  )
}

export default Loader
