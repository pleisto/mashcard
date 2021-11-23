import React from 'react'
import CSSMotion from 'rc-motion'
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
  existIcon: boolean
  loading?: boolean | object
}
const getCollapsedWidth = () => ({ width: 0, opacity: 0, transform: 'scale(0)' })
const getRealWidth = (node: HTMLElement) => ({
  width: node.scrollWidth,
  opacity: 1,
  transform: 'scale(1)'
})

const LoadingIcon: React.FC<LoadingIconProps> = ({ loading, existIcon }) => {
  const visible = !!loading

  if (existIcon) {
    return (
      <LoadingIconBtn>
        <LoadingOutlined />
      </LoadingIconBtn>
    )
  }

  return (
    <CSSMotion
      visible={visible}
      removeOnLeave
      onAppearStart={getCollapsedWidth}
      onAppearActive={getRealWidth}
      onEnterStart={getCollapsedWidth}
      onEnterActive={getRealWidth}
      onLeaveStart={getRealWidth}
      onLeaveActive={getCollapsedWidth}
    >
      {/* eslint-disable-next-line react/no-unused-prop-types */}
      {({ className, style }: { className?: string; style?: React.CSSProperties }, ref: any) => (
        <LoadingIconBtn className={className} style={style} ref={ref}>
          <LoadingOutlined />
        </LoadingIconBtn>
      )}
    </CSSMotion>
  )
}

export default LoadingIcon
