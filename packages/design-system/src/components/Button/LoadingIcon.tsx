import React from 'react'
import { Spin } from '../Spin'
import type { BtnType, Size } from './constants'

export interface LoadingIconProps {
  loading?: boolean
  size?: Size
  type?: BtnType
}

export const LoadingIcon: React.FC<LoadingIconProps> = ({ loading, size, type }) => {
  if (!loading) return null

  return <Spin size={size} color={type !== 'secondary' ? 'light' : 'dark'} />
}
