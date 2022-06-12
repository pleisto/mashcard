import { FC, ReactNode } from 'react'
import { PanelWrapper } from './index.style'

export const Panel: FC<{ title: ReactNode; css?: any; children: ReactNode }> = ({ children, title, css }) => {
  return (
    <PanelWrapper>
      <h2>{title}</h2>
      <div className="body">{children}</div>
    </PanelWrapper>
  )
}
