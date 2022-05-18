import { ResizableProps } from 're-resizable'
import { useState, useCallback, SyntheticEvent, Dispatch, SetStateAction } from 'react'
import { BlockActionOptions } from '../../../BlockActions'
import { useActionOptions } from '../useActionOptions'
import { ImageViewProps } from './ImageView'
import { maxWidth } from './styled'
import { useResizable } from './useResizable'

export function useImageState({ url, node, updateEmbedBlockAttributes, width }: ImageViewProps): {
  actionOptions: BlockActionOptions
  loaded: boolean
  showPreview: boolean
  setShowPreview: Dispatch<SetStateAction<boolean>>
  previewImage: VoidFunction
  onImageLoad: (event: SyntheticEvent<HTMLImageElement>) => void
  resizableProps: ResizableProps
} {
  const [loaded, setLoaded] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [actionOptions] = useActionOptions(url)

  const previewImage = useCallback((): void => {
    if (node.attrs.image?.key && !loaded) return
    if (showPreview) return
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

  const resizableProps = useResizable(updateEmbedBlockAttributes, width)

  return {
    actionOptions,
    loaded,
    showPreview,
    previewImage,
    onImageLoad,
    resizableProps,
    setShowPreview
  }
}
