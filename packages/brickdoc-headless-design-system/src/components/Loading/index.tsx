import React from 'react'
import mp4Url from './assets/loading.mp4'
import { styled } from '../../themes'

export interface LoadingProps {
  delayDuration?: number
  style?: React.CSSProperties
  className?: string
}

const Launcher = styled('div', {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

export const Loading: React.FC<LoadingProps> = ({ delayDuration, style, className }) => {
  return (
    <Launcher role="alert" aria-live="polite" aria-busy={true} aria-label="Loading" className={className} style={style}>
      <video
        autoPlay
        playsInline
        width={75}
        height={120}
        muted
        loop
        x-webkit-airplay="deny"
        disableRemotePlayback
        preload="auto"
      >
        <source src={mp4Url} type="video/mp4" />
      </video>
    </Launcher>
  )
}
