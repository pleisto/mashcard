import { FC } from 'react'
import { IconProvider, DEFAULT_ICON_CONFIGS } from '@brickdoc/design-icons'

export const Provider: FC = ({ children }) => (
  <IconProvider
    value={{
      ...DEFAULT_ICON_CONFIGS
    }}>
    {children}
  </IconProvider>
)
