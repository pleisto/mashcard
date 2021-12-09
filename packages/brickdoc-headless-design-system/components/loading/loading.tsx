import React from 'react'
import mp4Url from './assets/loading.mp4'
import { styled } from '../theme'

interface LoadingProps {
  delayDuration?: number
}

const Launcher = styled('div', {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

export const Loading: React.FC<LoadingProps> = ({ delayDuration }) => {
  return (
    <Launcher>
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
