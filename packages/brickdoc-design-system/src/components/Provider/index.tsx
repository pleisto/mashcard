import { FC } from 'react'
import { IconProvider, DEFAULT_ICON_CONFIGS } from '@brickdoc/design-icons'
import { IDProvider } from './IDProvider'
import { ToasterPortal } from '../Toast'

export const Provider: FC = ({ children }) => (
  <IDProvider>
    <IconProvider
      value={{
        ...DEFAULT_ICON_CONFIGS
      }}
    >
      {children}
      <ToasterPortal />
    </IconProvider>
  </IDProvider>
)
