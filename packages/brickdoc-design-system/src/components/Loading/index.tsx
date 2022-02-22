import React from 'react'
import mp4Url from './assets/loading.mp4'
import { styled, theme } from '../../themes'

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
  alignItems: 'center',
  backgroundColor: theme.colors.white,
  position: 'fixed',
  inset: 0,
  zIndex: theme.zIndices.loading
})

export const Loading: React.FC<LoadingProps> = ({ delayDuration, style, className }) => {
  return (
    <Launcher role="alert" aria-live="polite" aria-busy={true} aria-label="Loading" className={className} style={style}>
      <video
        autoPlay
        playsInline
        width={300}
        height={300}
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
