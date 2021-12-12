import { FC } from 'react'
import { User } from '@brickdoc/design-icons'
import { name2Initials, string2Color } from './initials'
import { styled, theme } from '../../themes'

type AvatarSize = 'small' | 'default' | 'large'

export interface AvatarProps {
  shape?: 'circle' | 'square'
  size?: AvatarSize | number
  alt?: string
  initials?: string
  src?: React.ReactNode | string
  className?: string
  style?: React.CSSProperties
}

const AvatarWrapper = styled('span', {
  display: 'inline-flex',
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
  overflow: 'hidden',
  background: theme.colors.backgroundSecondary,
  color: theme.colors.typeSecondary,
  '& > img': {
    display: 'inline-block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    verticalAlign: 'top'
  },
  '& > span': {
    color: theme.colors.white,
    fontSize: '0.8em'
  },
  variants: {
    shape: {
      circle: {
        borderRadius: '50%'
      },
      square: {
        borderRadius: '2px'
      }
    },
    size: {
      large: {
        width: '2.5rem',
        height: '2.5rem',
        lineHeight: '2.5rem'
      },
      default: {
        width: '2rem',
        height: '2rem',
        lineHeight: '2rem'
      },
      small: {
        width: '1.5rem',
        height: '1.5rem',
        lineHeight: '1.5rem'
      }
    }
  }
})

export const Avatar: FC<AvatarProps> = props => {
  const { shape = 'circle', size = 'default', alt, initials, src, className, style = {} } = props
  const isCustomSize = typeof size === 'number' ? size : undefined
  let childrenNode = src || (initials ? <span>{name2Initials(initials)}</span> : null) || <User />
  if (typeof childrenNode === 'string') childrenNode = <img src={childrenNode} alt={alt} />

  const customSizeCss = isCustomSize
    ? {
        width: `${size}px`,
        height: `${size}px`,
        lineHeight: `${size}px`
      }
    : undefined

  const initialsColor = initials ? { background: string2Color(initials) } : undefined

  return (
    <AvatarWrapper
      css={{
        ...customSizeCss,
        ...initialsColor,
        ...style
      }}
      shape={shape}
      size={isCustomSize ? undefined : (size as AvatarSize)}
      className={className}
    >
      {childrenNode}
    </AvatarWrapper>
  )
}
