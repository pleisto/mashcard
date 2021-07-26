import React, { useContext } from 'react'
import PWAProvider, { BrickdocContext } from '@/common/PWAProvider'
import { BrowserRouter as Router } from 'react-router-dom'
import { routeConfig } from './config/routes'
import { SidebarLayoutPage } from '@/docs/modules/common/layouts/SidebarLayoutPage'

const DocsPWA = () => {
  const { currentPod } = useContext(BrickdocContext)

  return (
    <Router>
      <SidebarLayoutPage webid={currentPod.webid}>{routeConfig(currentPod.webid)}</SidebarLayoutPage>
    </Router>
  )
}

export default (
  <PWAProvider>
    <DocsPWA />
  </PWAProvider>
)
