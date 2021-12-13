import React from 'react'

export type StrokeLinejoin = 'miter' | 'round' | 'bevel'
export type StrokeLinecap = 'butt' | 'round' | 'square'
export type Theme = 'outline' | 'filled' | 'two-tone' | 'multi-color'

export interface ISvgIconProps {
  // unique id for the Icon
  id: string

  // Icon Size, default is 1em
  size: number | string

  colors: string[]
}

export interface IIconConfig {
  size: number | string

  prefix: string

  rtl: boolean

  theme: Theme

  colors: {
    outline: {
      fill: string
      background: string
    }

    filled: {
      fill: string
      background: string
    }

    twoTone: {
      fill: string
      twoTone: string
    }

    multiColor: {
      outStrokeColor: string
      outFillColor: string
      innerStrokeColor: string
      innerFillColor: string
    }
  }
}

// Icon Base Props
export interface IIconBase {
  // Icon Size, default is 1em
  size?: number | string

  strokeWidth?: number

  strokeLinecap?: StrokeLinecap

  strokeLinejoin?: StrokeLinejoin

  theme?: Theme

  // fill color
  fill?: string | string[]
}

export type Intersection<T, K> = T & Omit<K, keyof T>

export interface IIcon extends IIconBase {
  spin?: boolean
}

export type IIconProps = Intersection<IIcon, React.HTMLAttributes<HTMLSpanElement>>
export type IconRender = (props: ISvgIconProps) => React.ReactElement

// Default Icon Config
export const DEFAULT_ICON_CONFIGS: IIconConfig = {
  size: '1em',
  rtl: false,
  theme: 'outline',
  colors: {
    outline: {
      fill: 'currentColor',
      background: 'transparent'
    },
    filled: {
      fill: 'currentColor',
      background: '#FFF'
    },
    twoTone: {
      fill: 'currentColor',
      twoTone: '--color-primary'
    },
    multiColor: {
      outStrokeColor: '#333',
      outFillColor: '--color-primary',
      innerStrokeColor: '#FFF',
      innerFillColor: '#43CCF8'
    }
  },
  prefix: 'brd'
}

function guid(): string {
  const uid = ((1 + Math.random()) * 0x100000000).toString(16).substring(1)
  return `brd-icon-${uid}`
}

/* eslint-disable complexity */
export function IconConverter(id: string, icon: IIconBase, config: IIconConfig): ISvgIconProps {
  const fill = typeof icon.fill === 'string' ? [icon.fill] : icon.fill || []
  const colors: string[] = []

  const theme: Theme = icon.theme || config.theme

  switch (theme) {
    case 'outline':
      colors.push(typeof fill[0] === 'string' ? fill[0] : 'currentColor')
      colors.push('none')
      colors.push(typeof fill[0] === 'string' ? fill[0] : 'currentColor')
      colors.push('none')
      break
    case 'filled':
      colors.push(typeof fill[0] === 'string' ? fill[0] : 'currentColor')
      colors.push(typeof fill[0] === 'string' ? fill[0] : 'currentColor')
      colors.push('#FFF')
      colors.push('#FFF')
      break
    case 'two-tone':
      colors.push(typeof fill[0] === 'string' ? fill[0] : 'currentColor')
      colors.push(typeof fill[1] === 'string' ? fill[1] : config.colors.twoTone.twoTone)
      colors.push(typeof fill[0] === 'string' ? fill[0] : 'currentColor')
      colors.push(typeof fill[1] === 'string' ? fill[1] : config.colors.twoTone.twoTone)
      break
    case 'multi-color':
      colors.push(typeof fill[0] === 'string' ? fill[0] : 'currentColor')
      colors.push(typeof fill[1] === 'string' ? fill[1] : config.colors.multiColor.outFillColor)
      colors.push(typeof fill[2] === 'string' ? fill[2] : config.colors.multiColor.innerStrokeColor)
      colors.push(typeof fill[3] === 'string' ? fill[3] : config.colors.multiColor.innerFillColor)
      break
  }

  return {
    size: icon.size || config.size,
    colors,
    id
  }
}

// Icon Configure Context
const IconContext = React.createContext(DEFAULT_ICON_CONFIGS)

// Icon Configure Provider
export const IconProvider = IconContext.Provider

export type Icon = (props: IIconProps) => React.FC

// Icon Wrapper
export function IconWrapper(name: string, rtl: boolean, render: IconRender) {
  /* eslint-disable react-hooks/rules-of-hooks */
  return (props: IIconProps) => {
    const { size, strokeWidth, strokeLinecap, strokeLinejoin, theme, fill, className, spin, ...extra } = props

    const ICON_CONFIGS = React.useContext(IconContext)

    const id = React.useMemo(guid, [])

    const svgProps = IconConverter(
      id,
      {
        size,
        strokeWidth,
        strokeLinecap,
        strokeLinejoin,
        theme,
        fill
      },
      ICON_CONFIGS
    )

    const cls: string[] = [`${ICON_CONFIGS.prefix}-icon`]

    cls.push(`${ICON_CONFIGS.prefix}-icon-${name}`)

    if (rtl && ICON_CONFIGS.rtl) {
      cls.push(`${ICON_CONFIGS.prefix}-icon-rtl`)
    }
    if (spin) {
      cls.push(`${ICON_CONFIGS.prefix}-icon-spin`)
    }
    if (className) {
      cls.push(className)
    }

    return (
      <span {...extra} role="img" aria-label={name} className={cls.join(' ')}>
        {render(svgProps)}
      </span>
    )
  }
}

export const ImageIcon: React.FC<{ src: string; alt?: string }> = props => {
  return <img src={props.src} alt={props.alt} className="brd-icon brd-icon-img" />
}
