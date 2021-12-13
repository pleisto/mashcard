import React from 'react'
import { Rotation } from '@brickdoc/design-icons'

export interface LoadingIconProps {
  loading?: boolean
}

export const LoadingIcon: React.FC<LoadingIconProps> = ({ loading }) => {
  if (!loading) return null

  return <Rotation className="brd-icon-spin" />
}
