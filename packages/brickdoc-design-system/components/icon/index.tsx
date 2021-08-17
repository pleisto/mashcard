import React from 'react'

export * from '@brickdoc/design-icons'

export const ImageIcon: React.FC<{ src: string; alt?: string }> = props => {
  return <img src={props.src} alt={props.alt || 'icon'} className="brk-icon brk-icon-img" />
}
