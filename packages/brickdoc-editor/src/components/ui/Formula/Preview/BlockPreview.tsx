import { BlockType } from '@brickdoc/formula'

export interface BlockPreviewProps {
  block: BlockType
  rootId: string
}

export const BlockPreview: React.FC<BlockPreviewProps> = ({ block, rootId }) => {
  return (
    <div className="autocomplete-preview-block">
      <div className="autocomplete-preview-block-name">{block.name(rootId)}</div>
    </div>
  )
}
