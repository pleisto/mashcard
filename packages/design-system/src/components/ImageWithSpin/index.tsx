import { CSSProperties } from '@stitches/react'
import { useSize } from 'ahooks'
import { FC, useEffect, useRef, useState } from 'react'
import { Blurhash } from 'react-blurhash'

import { Spin } from '../Spin'
import { Image, ImageWithSpinWrapper, SpinnerWrapper } from './style'

interface ImageWithSpinProps {
  alt?: string
  src?: string
  className?: string
  blurHash?: string
  style?: CSSProperties
}

export const ImageWithSpin: FC<ImageWithSpinProps> = ({ src, alt, blurHash, ...otherProps }) => {
  const [loading, setLoading] = useState(true)
  const [isInitLoad, setIsInitLoad] = useState(true)
  const [currentSrc, setSrc] = useState<string | undefined>(src)
  const containerRef = useRef<HTMLDivElement>(null)
  const containerSize = useSize(containerRef)
  const blurHashSize = {
    width: otherProps.style?.width ?? containerSize?.width,
    height: otherProps.style?.height ?? containerSize?.height
  }
  const [spinnerInDom, setSpinnerInDom] = useState(true)
  const spinnerVisible = loading && (Boolean(blurHash) || isInitLoad)

  useEffect(() => {
    if (currentSrc && src !== currentSrc) {
      setSrc(src)
      setLoading(true)
      setIsInitLoad(false)
    }
  }, [src, currentSrc])

  useEffect(() => {
    if (spinnerVisible) {
      setSpinnerInDom(true)
    } else {
      // Delay DOM removal until animation ends
      const timeout = setTimeout(() => {
        setSpinnerInDom(false)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [spinnerVisible])

  // Make the image completely transparent before loading to hide the image when it is first loaded
  return (
    <ImageWithSpinWrapper ref={containerRef} {...otherProps}>
      <Image
        hidePic={isInitLoad && loading}
        blur={!blurHash && !isInitLoad && loading}
        alt={alt}
        src={currentSrc}
        onLoad={() => setLoading(false)}
      />

      {spinnerInDom && (
        <SpinnerWrapper
          role="progressbar"
          aria-busy={spinnerVisible}
          aria-hidden={!spinnerVisible}
          visible={spinnerVisible}
        >
          {blurHash ? (
            blurHashSize.width &&
            blurHashSize.height && <Blurhash hash={blurHash} width={blurHashSize.width} height={blurHashSize.height} />
          ) : (
            <Spin size="lg" className="cover-spin" />
          )}
        </SpinnerWrapper>
      )}
    </ImageWithSpinWrapper>
  )
}
