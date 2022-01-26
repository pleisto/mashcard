import { FC } from 'react'
import { IconProvider, DEFAULT_ICON_CONFIGS } from '@brickdoc/design-icons'
import { ToasterPortal } from '../Toast'

export const Provider: FC = ({ children }) => (
  <IconProvider
    value={{
      ...DEFAULT_ICON_CONFIGS
    }}
  >
    {children}
    <ToasterPortal />
  </IconProvider>
)
