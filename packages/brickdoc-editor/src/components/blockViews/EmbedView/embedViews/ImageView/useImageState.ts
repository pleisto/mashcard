import { ResizableProps } from 're-resizable'
import { useState, useCallback, SyntheticEvent, Dispatch, SetStateAction } from 'react'
import { BlockActionOptions } from '../../../BlockActions'
import { useActionOptions } from '../useActionOptions'
import { ImageViewProps } from './ImageView'
import { maxWidth, minWidth } from './ImageView.style'
import { useResizable } from './useResizable'

export function useImageState({ url, node, updateEmbedBlockAttributes, width }: ImageViewProps): {
  actionOptions: BlockActionOptions
  loaded: boolean
  showPreview: boolean
  setShowPreview: Dispatch<SetStateAction<boolean>>
  previewImage: VoidFunction
  onImageLoad: (event: SyntheticEvent<HTMLImageElement>) => void
  resizableProps: ResizableProps
  zoomInImage: VoidFunction
  zoomOutImage: VoidFunction
} {
  const [loaded, setLoaded] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [actionOptions] = useActionOptions(url)

  const previewImage = useCallback((): void => {
    if (!node.attrs.image?.key || !loaded || showPreview) return
    setShowPreview(true)
  }, [loaded, node.attrs.image?.key, showPreview])

  const onImageLoad = useCallback(
    (event: SyntheticEvent<HTMLImageElement>): void => {
      const img = event.target as HTMLImageElement
      // Update image dimensions on loaded if there is no dimensions data before
      if (!node.attrs.image?.ratio) {
        updateEmbedBlockAttributes(
          {
            width: Math.min(maxWidth, img.naturalWidth),
            ratio: img.naturalWidth / img.naturalHeight
          },
          'image'
        )
      }
      setLoaded(true)
    },
    [node.attrs.image?.ratio, updateEmbedBlockAttributes]
  )

  const resizableProps = useResizable(node.attrs.image.align === 'full-width', updateEmbedBlockAttributes, width)

  const d = 50
  const zoomInImage = useCallback(() => {
    updateEmbedBlockAttributes({ width: Math.min(maxWidth, (node.attrs.image.width ?? 0) + d) }, 'image')
  }, [node.attrs.image.width, updateEmbedBlockAttributes])

  const zoomOutImage = useCallback(() => {
    updateEmbedBlockAttributes({ width: Math.max(minWidth, (node.attrs.image.width ?? 0) - d) }, 'image')
  }, [node.attrs.image.width, updateEmbedBlockAttributes])

  return {
    actionOptions,
    loaded,
    showPreview,
    previewImage,
    onImageLoad,
    resizableProps,
    setShowPreview,
    zoomInImage,
    zoomOutImage
  }
}
