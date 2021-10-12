import * as React from 'react'
import classNames from 'classnames'
import ResizeObserver from 'rc-resize-observer'
import { composeRef } from 'rc-util/lib/ref'
import { ConfigContext } from '../config-provider'
import { Breakpoint, responsiveArray } from '../_util/responsiveObserve'
import useBreakpoint from '../grid/hooks/useBreakpoint'
import SizeContext, { AvatarSize } from './SizeContext'
import { name2Initials, string2Color } from './initials'

export interface AvatarProps {
  /** Shape of avatar, options: `circle`, `square` */
  shape?: 'circle' | 'square'
  /*
   * Size of avatar, options: `large`, `small`, `default`
   * or a custom number size
   * */
  size?: AvatarSize
  gap?: number
  /** Src of image avatar */
  src?: React.ReactNode
  /** Srcset of image avatar */
  srcSet?: string
  draggable?: boolean
  /** Icon to be used in avatar */
  icon?: React.ReactNode
  /** Initials like @microsoft/fluent-ui */
  initials?: string
  style?: React.CSSProperties
  prefixCls?: string
  className?: string
  children?: React.ReactNode
  alt?: string
  crossOrigin?: '' | 'anonymous' | 'use-credentials'
  /* callback when img load error */
  /* return false to prevent Avatar show default fallback behavior, then you can do fallback by your self */
  onError?: () => boolean
}

const InternalAvatar: React.ForwardRefRenderFunction<unknown, AvatarProps> = (props, ref) => {
  const groupSize = React.useContext(SizeContext)

  const [scale, setScale] = React.useState(1)
  const [mounted, setMounted] = React.useState(false)
  const [isImgExist, setIsImgExist] = React.useState(true)

  const avatarNodeRef = React.useRef<HTMLElement>()
  const avatarChildrenRef = React.useRef<HTMLElement>()

  const avatarNodeMergeRef = composeRef(ref, avatarNodeRef)

  const { getPrefixCls } = React.useContext(ConfigContext)

  const setScaleParam = () => {
    if (!avatarChildrenRef.current || !avatarNodeRef.current) {
      return
    }
    const childrenWidth = avatarChildrenRef.current.offsetWidth // offsetWidth avoid affecting be transform scale
    const nodeWidth = avatarNodeRef.current.offsetWidth
    // denominator is 0 is no meaning
    if (childrenWidth !== 0 && nodeWidth !== 0) {
      const { gap = 4 } = props
      if (gap * 2 < nodeWidth) {
        setScale(nodeWidth - gap * 2 < childrenWidth ? (nodeWidth - gap * 2) / childrenWidth : 1)
      }
    }
  }

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    setIsImgExist(true)
    setScale(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.src])

  React.useEffect(() => {
    setScaleParam()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.gap])

  const handleImgLoadError = () => {
    const { onError } = props
    const errorFlag = onError ? onError() : undefined
    if (errorFlag) {
      setIsImgExist(false)
    }
  }

  const {
    prefixCls: customizePrefixCls,
    shape,
    size: customSize,
    src,
    srcSet,
    icon,
    initials,
    className,
    alt,
    draggable,
    children,
    crossOrigin,
    ...others
  } = props

  const size = customSize === 'default' ? groupSize : customSize

  const screens = useBreakpoint()
  const responsiveSizeStyle: React.CSSProperties = React.useMemo(() => {
    if (typeof size !== 'object') {
      return {}
    }

    const currentBreakpoint: Breakpoint = responsiveArray.find(screen => screens[screen])!
    const currentSize = size[currentBreakpoint]

    return currentSize
      ? {
          width: currentSize,
          height: currentSize,
          lineHeight: `${currentSize}px`,
          fontSize: icon ? currentSize / 2 : 18
        }
      : {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screens, size])

  const prefixCls = getPrefixCls('avatar', customizePrefixCls)

  const sizeCls = classNames({
    [`${prefixCls}-lg`]: size === 'large',
    [`${prefixCls}-sm`]: size === 'small'
  })

  const hasImageElement = React.isValidElement(src)

  const classString = classNames(
    prefixCls,
    sizeCls,
    {
      [`${prefixCls}-${shape}`]: !!shape,
      [`${prefixCls}-image`]: hasImageElement || (src && isImgExist),
      [`${prefixCls}-icon`]: !!icon
    },
    className
  )

  const sizeStyle: React.CSSProperties =
    typeof size === 'number'
      ? {
          width: size,
          height: size,
          lineHeight: `${size}px`,
          fontSize: icon ? size / 2 : 18
        }
      : {}

  let childrenToRender
  let initialsStyle: React.CSSProperties = {}
  if (typeof src === 'string' && isImgExist) {
    childrenToRender = (
      <img src={src} draggable={draggable} srcSet={srcSet} onError={handleImgLoadError} alt={alt} crossOrigin={crossOrigin} />
    )
  } else if (hasImageElement) {
    childrenToRender = src
  } else if (initials) {
    childrenToRender = name2Initials(initials)
    initialsStyle = { backgroundColor: string2Color(initials) }
  } else if (icon) {
    childrenToRender = icon
  } else if (mounted || scale !== 1) {
    const transformString = `scale(${scale}) translateX(-50%)`
    const childrenStyle: React.CSSProperties = {
      msTransform: transformString,
      WebkitTransform: transformString,
      transform: transformString
    }

    const sizeChildrenStyle: React.CSSProperties =
      typeof size === 'number'
        ? {
            lineHeight: `${size}px`
          }
        : {}

    childrenToRender = (
      <ResizeObserver onResize={setScaleParam}>
        <span
          className={`${prefixCls}-string`}
          ref={(node: HTMLElement) => {
            avatarChildrenRef.current = node
          }}
          style={{ ...sizeChildrenStyle, ...childrenStyle }}
        >
          {children}
        </span>
      </ResizeObserver>
    )
  } else {
    childrenToRender = (
      <span
        className={`${prefixCls}-string`}
        style={{ opacity: 0 }}
        ref={(node: HTMLElement) => {
          avatarChildrenRef.current = node
        }}
      >
        {children}
      </span>
    )
  }

  // The event is triggered twice from bubbling up the DOM tree.
  // see https://codesandbox.io/s/kind-snow-9lidz
  delete others.onError
  delete others.gap

  return (
    <span
      {...others}
      style={{ ...sizeStyle, ...responsiveSizeStyle, ...initialsStyle, ...others.style }}
      className={classString}
      ref={avatarNodeMergeRef as any}
    >
      {childrenToRender}
    </span>
  )
}

const Avatar = React.forwardRef<unknown, AvatarProps>(InternalAvatar)
Avatar.displayName = 'Avatar'

Avatar.defaultProps = {
  shape: 'circle' as AvatarProps['shape'],
  size: 'default' as AvatarProps['size']
}

export default Avatar
