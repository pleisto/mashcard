import React from 'react'
import { styled } from '../theme'
import { Rotation as LoadingOutlined } from '../icon'

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

const LoadingIcon: React.FC<LoadingIconProps> = ({ loading }) => {
  if (!loading) return null

  return (
    <LoadingIconBtn>
      <LoadingOutlined />
    </LoadingIconBtn>
  )
}

export default LoadingIcon
