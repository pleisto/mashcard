import * as React from 'react'
import { NodeViewWrapper } from '@tiptap/react'
import './styles.less'

export const ImageSection: React.FC<{}> = () => {
  return (
    <NodeViewWrapper>
      <div className="brickdoc-block-image-section">
        <div className="image-section-hint">Add an image</div>
      </div>
    </NodeViewWrapper>
  )
}
