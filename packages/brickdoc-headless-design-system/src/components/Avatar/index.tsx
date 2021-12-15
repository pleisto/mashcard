import { FC, useMemo } from 'react'
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
  include: ['flexCenter'],
  display: 'inline-flex',
  position: 'relative',
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
  overflow: 'hidden',
  background: theme.colors.backgroundSecondary,
  color: theme.colors.typeSecondary,
  isolation: 'isolation',
  '& > img': {
    display: 'inline-block',
    boxSize: '100%',
    verticalAlign: 'top'
  },
  '& > span': {
    color: theme.colors.white,
    fontSize: '0.8rem'
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
        boxSize: '2.5rem',
        lineHeight: '2.5rem',
        fontSize: '2.5rem'
      },
      default: {
        boxSize: '2rem',
        lineHeight: '2rem',
        fontSize: '2rem'
      },
      small: {
        boxSize: '1.5rem',
        lineHeight: '1.5rem',
        fontSize: '1.5rem',
        '& > span': {
          fontSize: '0.625rem'
        }
      }
    },
    default: {
      true: {
        alignItems: 'flex-end',
        background: theme.colors.ceramicSecondary,
        border: `1px solid ${'rgba(0,0,0,0.12)'}`,
        '& > span.brd-icon': {
          color: theme.colors.dividerSecondary,
          fontSize: '.75em'
        }
      }
    }
  }
})

export const Avatar: FC<AvatarProps> = props => {
  const { shape = 'circle', size = 'default', alt, initials, src, className, style = {} } = props

  const initialsObj = useMemo(
    () =>
      initials
        ? {
            color: { background: string2Color(initials) },
            text: name2Initials(initials)
          }
        : undefined,
    [initials]
  )

  const isCustomSize = typeof size === 'number' ? size : undefined
  let childrenNode = src || (initialsObj ? <span>{initialsObj.text}</span> : null) || <User theme="filled" />
  if (typeof childrenNode === 'string') childrenNode = <img src={childrenNode} alt={alt} />

  const customSizeCss = isCustomSize
    ? {
        boxSize: `${size}px`,
        lineHeight: `${size}px`
      }
    : undefined

  return (
    <AvatarWrapper
      css={{
        ...customSizeCss,
        ...initialsObj?.color,
        ...style
      }}
      default={!src && !initials}
      shape={shape}
      size={isCustomSize ? undefined : (size as AvatarSize)}
      className={className}
    >
      {childrenNode}
    </AvatarWrapper>
  )
}
