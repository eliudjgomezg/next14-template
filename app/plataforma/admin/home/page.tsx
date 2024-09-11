import { Metadata, NextPage } from 'next'

import Home from 'components/Admin/Home/Home'

export const metadata: Metadata = {
  title: 'Home',
}

const CoursesPage: NextPage = () => {
  return <Home />
}

export default CoursesPage
