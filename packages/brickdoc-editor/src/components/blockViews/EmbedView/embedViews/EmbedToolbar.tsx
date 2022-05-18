import { FC } from 'react'
import { EmbedAttributes, EmbedViewMode } from '../../../../extensions/blocks/embed/meta'
import { Toolbar } from '../../../ui'
import { EmbedBlockType, UpdateEmbedBlockAttributes } from '../EmbedView'
import { useEmbedToolbarOptions } from './useEmbedToolbarOptions'

export interface EmbedToolbarProps {
  mode: EmbedViewMode
  blockType: EmbedBlockType
  displayName: string
  url: string
  updateEmbedBlockAttributes: UpdateEmbedBlockAttributes
  onFullScreen?: VoidFunction
  align?: EmbedAttributes['image']['align']
}

export const EmbedToolbar: FC<EmbedToolbarProps> = ({
  mode,
  blockType,
  displayName,
  url,
  updateEmbedBlockAttributes,
  onFullScreen,
  align
}) => {
  const [options] = useEmbedToolbarOptions({
    mode,
    blockType,
    displayName,
    url,
    updateEmbedBlockAttributes,
    onFullScreen,
    align
  })

  return <Toolbar type="transparent" options={options} />
}

EmbedToolbar.toString = () => '.embed-view-toolbar'
