import React from 'react'
import './style'

export type { IIconConfig } from '@icon-park/react/lib/runtime'
export * from '@icon-park/react/lib/map'
export { IconProvider } from '@icon-park/react/lib/runtime'

export const ImageIcon: React.FC<{ src: string; alt?: string }> = props => {
  return <img src={props.src} alt={props.alt || 'icon'} className="brk-icon brk-icon-img" />
}
