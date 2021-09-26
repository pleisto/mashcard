import React, { FC, useContext } from 'react'
import { PWAProvider, BrickdocContext } from '@/common/PWAProvider'
import { BrowserRouter as Router } from 'react-router-dom'
import { routeConfig } from './config/routes'

export const DocsPWA: FC = () => {
  const { currentPod } = useContext(BrickdocContext)

  if (!currentPod) {
    console.error('No pod data provided by the server.')
    return null
  }

  return <Router>{routeConfig(currentPod.webid)}</Router>
}

// eslint-disable-next-line import/no-default-export
export default (
  <PWAProvider>
    <DocsPWA />
  </PWAProvider>
)
