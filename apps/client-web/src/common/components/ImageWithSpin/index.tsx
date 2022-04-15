import * as React from 'react'
import { ImageWithSpinWrapper, Image } from './style'
import { Spin } from '@brickdoc/design-system'
import type { CSS } from '@stitches/react'

export interface IImageWithSpin {
  alt?: string
  src?: string
  css?: CSS
}

export const ImageWithSpin: React.FC<IImageWithSpin> = ({ src, alt, ...otherProps }) => {
  const [spining, setSpining] = React.useState(true)
  React.useEffect(() => {
    setSpining(true)
  }, [src])
  return (
    <ImageWithSpinWrapper {...otherProps}>
      <Image spining={spining} alt={alt} src={src} onLoad={() => setSpining(false)} />
      {spining && <Spin size="lg" className="cover-spin" />}
    </ImageWithSpinWrapper>
  )
}
