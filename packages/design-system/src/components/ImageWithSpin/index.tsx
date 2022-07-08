import * as React from 'react'
import { Blurhash } from 'react-blurhash'
import { ImageWithSpinWrapper, Image, BlurHashWrapper } from './style'
import { Spin } from '../Spin'
import { CSSProperties } from '@stitches/react'

interface ImageWithSpinProps {
  alt?: string
  src?: string
  className?: string
  blurHash?: string
  style?: CSSProperties
}

export const ImageWithSpin: React.FC<ImageWithSpinProps> = ({ src, alt, blurHash, ...otherProps }) => {
  const [loading, setLoading] = React.useState(true)
  const [isInitLoad, setIsInitLoad] = React.useState(true)
  const [currentSrc, setSrc] = React.useState<string | undefined>(src)
  React.useEffect(() => {
    if (currentSrc && src !== currentSrc) {
      setSrc(src)
      setLoading(true)
      setIsInitLoad(false)
    }
  }, [src, currentSrc])
  // Make the image completely transparent before loading to hide the image when it is first loaded
  return (
    <ImageWithSpinWrapper {...otherProps}>
      <Image
        hidePic={isInitLoad && loading}
        spining={loading}
        alt={alt}
        src={currentSrc}
        onLoad={() => setLoading(false)}
      />
      {isInitLoad &&
        loading &&
        (blurHash && otherProps.style ? (
          <BlurHashWrapper data-testid="blurhash" role="progressbar" aria-busy>
            <Blurhash hash={blurHash} width={otherProps.style.width} height={otherProps.style.height} />
          </BlurHashWrapper>
        ) : (
          <Spin size="lg" className="cover-spin" />
        ))}
    </ImageWithSpinWrapper>
  )
}
