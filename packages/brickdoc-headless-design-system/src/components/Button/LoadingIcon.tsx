import React from 'react'
import { Rotation } from '@brickdoc/design-icons'
import { prefix } from '../../themes'

export interface LoadingIconProps {
  loading?: boolean
}

export const LoadingIcon: React.FC<LoadingIconProps> = ({ loading }) => {
  if (!loading) return null

  return <Rotation className={`${prefix}-icon-spin`} />
}
