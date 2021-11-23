import React from 'react'
import mp4 from './assets/loading.mp4'

export interface ButtonProps {
  className?: string
}

const Loading: React.FC<ButtonProps> = ({ className, ...rest }) => {
  return (
    <video className={className} autoPlay playsInline muted loop {...rest}>
      <source src={mp4} type="video/mp4" />
    </video>
  )
}

export default Loading
