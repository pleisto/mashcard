import { FC } from 'react'
import { EmbedViewMode } from '../../../../extensions/blocks/embed/meta'
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
}

export const EmbedToolbar: FC<EmbedToolbarProps> = ({
  mode,
  blockType,
  displayName,
  url,
  updateEmbedBlockAttributes,
  onFullScreen
}) => {
  const [options] = useEmbedToolbarOptions({
    mode,
    blockType,
    displayName,
    url,
    updateEmbedBlockAttributes,
    onFullScreen
  })

  return <Toolbar type="transparent" options={options} />
}

EmbedToolbar.toString = () => '.embed-view-toolbar'
