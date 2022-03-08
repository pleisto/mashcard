import { BlockType } from '@brickdoc/formula'

export interface BlockPreviewProps {
  block: BlockType
  blockId: string
}

export const BlockPreview: React.FC<BlockPreviewProps> = ({ block, blockId }) => {
  return (
    <div className="autocomplete-preview-block">
      <div className="autocomplete-preview-block-name">{block.name(blockId)}</div>
    </div>
  )
}
