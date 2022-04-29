import { FC } from 'react'
import { EmbedViewMode } from '../../../../extensions/blocks/embed/meta'
import { Toolbar } from '../../../ui'
import { EmbedBlockType, UpdateEmbedBlockAttributes } from '../EmbedView'
import { useModeSwitchOptions } from './useModeSwitchOptions'

export interface ModeSwitchProps {
  mode: EmbedViewMode
  blockType: EmbedBlockType
  updateEmbedBlockAttributes: UpdateEmbedBlockAttributes
}

export const ModeSwitch: FC<ModeSwitchProps> = ({ mode, blockType, updateEmbedBlockAttributes }) => {
  const [options] = useModeSwitchOptions(mode, blockType, updateEmbedBlockAttributes)

  return <Toolbar type="transparent" options={options} />
}

ModeSwitch.toString = () => '.embed-view-mode-switch'
