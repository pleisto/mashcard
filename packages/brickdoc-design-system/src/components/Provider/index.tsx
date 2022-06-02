import { FC } from 'react'
import { IconProvider, DEFAULT_ICON_CONFIGS } from '@brickdoc/design-icons'
import { IDProvider } from './IDProvider'
import { ToasterPortal } from '../Toast'

interface Props {
  children?: React.ReactNode
}

export const Provider: FC<Props> = ({ children }) => (
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
