import React, { FC, useContext } from 'react'
import { PWAProvider, BrickdocContext } from '@/common/PWAProvider'
import { BrowserRouter as Router } from 'react-router-dom'
import { routeConfig } from './config/routes'
import { SidebarLayoutPage } from '@/docs/modules/common/layouts/SidebarLayoutPage'

export const DocsPWA: FC = () => {
  const { currentPod } = useContext(BrickdocContext)

  if (!currentPod) {
    console.error('No pod data provided by the server.')
    return null
  }

  return (
    <Router>
      <SidebarLayoutPage webid={currentPod.webid}>{routeConfig(currentPod.webid)}</SidebarLayoutPage>
    </Router>
  )
}

// eslint-disable-next-line import/no-default-export
export default (
  <PWAProvider>
    <DocsPWA />
  </PWAProvider>
)
