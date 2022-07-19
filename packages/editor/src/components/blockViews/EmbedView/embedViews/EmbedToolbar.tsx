import { FC } from 'react'
import { EmbedAttributes, EmbedViewMode, EmbedViewProps } from '../../../../extensions/blocks/embed/meta'
import { Toolbar } from '../../../ui'
import { EmbedBlockType, UpdateEmbedBlockAttributes } from '../EmbedView'
import { useEmbedToolbarOptions } from './useEmbedToolbarOptions'

export interface EmbedToolbarProps {
  mode: EmbedViewMode
  blockType: EmbedBlockType
  displayName: string
  url: string
  updateEmbedBlockAttributes: UpdateEmbedBlockAttributes
  extension?: EmbedViewProps['extension']
  onFullScreen?: VoidFunction
  zoomInImage?: VoidFunction
  zoomOutImage?: VoidFunction
  align?: EmbedAttributes['image']['align']
}

export const EmbedToolbar: FC<EmbedToolbarProps> = ({
  mode,
  blockType,
  displayName,
  url,
  extension,
  updateEmbedBlockAttributes,
  onFullScreen,
  zoomInImage,
  zoomOutImage,
  align
}) => {
  const [options] = useEmbedToolbarOptions({
    mode,
    blockType,
    displayName,
    url,
    extension,
    updateEmbedBlockAttributes,
    onFullScreen,
    align,
    zoomInImage,
    zoomOutImage
  })
  console.log(888888, options)
  return <Toolbar type="transparent" options={options} />
}

EmbedToolbar.toString = () => '.embed-view-toolbar'
