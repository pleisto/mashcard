import React, { useContext } from 'react'
import PWAProvider, { BrickdocContext } from '@/common/PWAProvider'
import { BrowserRouter as Router } from 'react-router-dom'
import renderRoutes from './config/routes'
import { SidebarLayoutPage } from '@/docs/modules/common/layouts/SidebarLayoutPage'

const DocsPWA = () => {
  const { currentUser } = useContext(BrickdocContext)

  return (
    <Router>
      <SidebarLayoutPage currentUserWebid={currentUser.webid}>{renderRoutes(currentUser.webid)}</SidebarLayoutPage>
    </Router>
  )
}

export default (
  <PWAProvider>
    <DocsPWA />
  </PWAProvider>
)
