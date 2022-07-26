import { ForwardRefRenderFunction, useMemo, RefObject, forwardRef, createRef, HTMLProps } from 'react'
import { User } from '@mashcard/design-icons'
import { name2Initials, string2Color } from './initials'
import defaultAvatar from './assets/avatars.png'
import { styled, theme } from '../../themes'

type AvatarSize = 'sm' | 'md' | 'lg' | 'xs' | 'xxs'

export interface AvatarProps extends Omit<HTMLProps<HTMLDivElement>, 'size' | 'src' | 'css' | 'ref'> {
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
    fontSize: '0.5em'
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
      lg: {
        boxSize: '2.5rem',
        lineHeight: '2.5rem',
        fontSize: '2.5rem'
      },
      md: {
        boxSize: '2rem',
        lineHeight: '2rem',
        fontSize: '2rem'
      },
      sm: {
        boxSize: '1.5rem',
        lineHeight: '1.5rem',
        fontSize: '1.5rem'
      },
      xs: {
        boxSize: '1.375rem',
        lineHeight: '1.375rem',
        fontSize: '1.375rem'
      },
      xxs: {
        boxSize: '1rem',
        lineHeight: '1rem',
        fontSize: '1rem'
      }
    },
    default: {
      true: {
        alignItems: 'flex-end',
        background: theme.colors.ceramicSecondary,
        border: `1px solid ${'rgba(0,0,0,0.12)'}`,
        '& > span.mc-icon': {
          color: theme.colors.dividerSecondary,
          fontSize: '.75em'
        }
      }
    }
  }
})

const Avatar: ForwardRefRenderFunction<HTMLSpanElement, AvatarProps> = (props, ref) => {
  const { shape = 'circle', size = 'md', alt, initials, src, className, style = {} } = props
  const avatarRef = (ref as RefObject<HTMLSpanElement>) || createRef<HTMLSpanElement>()

  const initialsObj = useMemo(() => {
    // format the initials up ahead, otherwise it may
    // render a colored avatar but has no text within,
    // in case the `intiials` consists of whitespaces.
    const formatted = name2Initials(initials ?? '')
    return formatted
      ? {
          color: { background: string2Color(initials) },
          text: formatted
        }
      : undefined
  }, [initials])

  const isCustomSize = typeof size === 'number' ? size : undefined
  let childrenNode = src ?? (initialsObj ? <span>{initialsObj.text}</span> : null) ?? <User theme="filled" />
  if (typeof childrenNode === 'string') {
    if (!childrenNode) {
      childrenNode = typeof defaultAvatar === 'string' ? defaultAvatar : defaultAvatar.src
    } else {
      childrenNode = childrenNode.length <= 4 ? childrenNode : <img src={childrenNode} alt={alt} />
    }
  }

  const customSizeCss = isCustomSize
    ? {
        boxSize: `${size}px`,
        lineHeight: `${size}px`,
        fontSize: `${size}px`
      }
    : undefined

  return (
    <AvatarWrapper
      ref={avatarRef}
      css={{
        ...customSizeCss,
        ...initialsObj?.color,
        ...(style as any)
      }}
      default={!src && !initials}
      shape={shape}
      size={isCustomSize ? undefined : (size as AvatarSize)}
      className={className}>
      {childrenNode}
    </AvatarWrapper>
  )
}
const _Avatar = forwardRef(Avatar)
_Avatar.displayName = 'Avatar'

export { _Avatar as Avatar }
