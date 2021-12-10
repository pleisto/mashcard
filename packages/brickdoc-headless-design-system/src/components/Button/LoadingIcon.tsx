import React from 'react'
import { styled } from '../../themes'
import { Rotation } from '@brickdoc/design-icons'

const LoadingIconBtn = styled('span', {
  transition: 'all 0.3s $ease-in-out',

  [`& > span`]: {
    paddingRight: '10px',
    animation: 'none',
    svg: {
      animation: 'loadingCircle 1s infinite linear'
    }
  }
})

export interface LoadingIconProps {
  loading?: boolean
}

export const LoadingIcon: React.FC<LoadingIconProps> = ({ loading }) => {
  if (!loading) return null

  return (
    <LoadingIconBtn>
      <Rotation />
    </LoadingIconBtn>
  )
}
