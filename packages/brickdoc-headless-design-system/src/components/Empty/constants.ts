import { ReactNode, CSSProperties } from 'react'

export enum EmptyType {
  Empty,
  Found
}

export interface EmptyOrFoundProps {
  prefixCls?: string
  type?: EmptyType
  uid: string
}

export interface EmptyProps {
  prefixCls?: string
  className?: string
  style?: CSSProperties
  description?: ReactNode
  action?: ReactNode
  type?: EmptyType
  id?: string
}
