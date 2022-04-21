import * as React from 'react'
import { ImageWithSpinWrapper, Image } from './style'
import { Spin } from '../Spin'

export interface IImageWithSpin {
  alt?: string
  src?: string
  className?: string
}

export const ImageWithSpin: React.FC<IImageWithSpin> = ({ src, alt, ...otherProps }) => {
  const [spining, setSpining] = React.useState(true)
  const [isInitLoad, setIsInitLoad] = React.useState(true)
  const [currentSrc, setSrc] = React.useState<string | undefined>(src)
  React.useEffect(() => {
    if (currentSrc && src !== currentSrc) {
      setSrc(src)
      setSpining(true)
      setIsInitLoad(false)
    }
  }, [src, currentSrc])
  // Make the image completely transparent before loading to hide the image when it is first loaded
  return (
    <ImageWithSpinWrapper {...otherProps}>
      <Image
        hidePic={isInitLoad && spining}
        spining={spining}
        alt={alt}
        src={currentSrc}
        onLoad={() => setSpining(false)}
      />
      {isInitLoad && spining && <Spin size="lg" className="cover-spin" />}
    </ImageWithSpinWrapper>
  )
}
