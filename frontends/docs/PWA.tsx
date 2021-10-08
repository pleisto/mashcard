import React, { FC, useContext } from 'react'
import { PWAProvider, BrickdocContext } from '@/common/PWAProvider'
import { BrowserRouter as Router } from 'react-router-dom'
import { routeConfig } from './config/routes'

const DocsPWA: FC = () => {
  const { currentPod } = useContext(BrickdocContext)

  return <Router>{routeConfig(currentPod.webid)}</Router>
}

// eslint-disable-next-line import/no-default-export
export default (
  <PWAProvider>
    <DocsPWA />
  </PWAProvider>
)
