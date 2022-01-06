import { MouseEvent } from 'react'
import { PressEvent } from '@react-types/shared/src/events'

export interface TagProps {
  text: any
  value?: string | number
  closable?: boolean
  size?: 'sm' | 'lg' | 'md'
  style?: any
  // TODO: any => temporary compatible
  color?: 'none' | 'primary' | 'red' | 'cyan' | 'blue' | any
  border?: boolean
  prefixCls?: string
  onClick?: (e: MouseEvent<HTMLElement> | PressEvent, value: string | number) => void
  onClose?: (e: MouseEvent<HTMLElement>, value: string | number) => void
}

export interface TagGroupProps {
  size?: 'sm' | 'lg' | 'md'
  tagList: TagProps[]
}
