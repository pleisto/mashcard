import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { DocumentPageLayout } from './_shared/DocumentPageLayout'

export const Layout: FC = () => {
  return (
    <DocumentPageLayout>
      <Outlet />
    </DocumentPageLayout>
  )
}

// eslint-disable-next-line import/no-default-export
export default Layout
