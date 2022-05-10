import { FC } from 'react'
import { EmbedViewMode } from '../../../../extensions/blocks/embed/meta'
import { Toolbar } from '../../../ui'
import { EmbedBlockType, UpdateEmbedBlockAttributes } from '../EmbedView'
import { useModeSwitchOptions } from './useModeSwitchOptions'

export interface ModeSwitchProps {
  mode: EmbedViewMode
  blockType: EmbedBlockType
  displayName: string
  url: string
  updateEmbedBlockAttributes: UpdateEmbedBlockAttributes
}

export const ModeSwitch: FC<ModeSwitchProps> = ({ mode, blockType, displayName, url, updateEmbedBlockAttributes }) => {
  const [options] = useModeSwitchOptions(mode, blockType, displayName, url, updateEmbedBlockAttributes)

  return <Toolbar type="transparent" options={options} />
}

ModeSwitch.toString = () => '.embed-view-mode-switch'
