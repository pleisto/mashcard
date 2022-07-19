import { FC } from 'react'
import { FileType } from '../../../../../helpers/file'
import { useActionOptions } from '../useActionOptions'
import { BlockContainer } from '../../../BlockContainer'
import { EmbedViewProps } from '../../../../../extensions/blocks/embed/meta'
import { EmbedBlockType, UpdateEmbedBlockAttributes } from '../../EmbedView'
import { PdftronDocument } from './PdftronDocument/PdftronDocument'
import { WebsiteDocument } from './WebsiteDocument'
import { styled } from '@mashcard/design-system'
import { EmbedToolbarContainer } from './DocumentFooter'
import { maxWidth } from '../../EmbedView.style'

export interface PreviewViewProps {
  blockType: EmbedBlockType
  deleteNode: EmbedViewProps['deleteNode']
  getPos: EmbedViewProps['getPos']
  node: EmbedViewProps['node']
  extension: EmbedViewProps['extension']
  updateEmbedBlockAttributes: UpdateEmbedBlockAttributes
  displayName: string
  fileName: string
  fileType: FileType
  fileUrl: string
  icon?: string | null
  // previewHtml is PreviewBox's html attribute
  previewHtml?: string | null
}

const DocumentContainer = styled('div', {
  maxWidth,

  '&:hover': {
    [`& ${EmbedToolbarContainer}`]: {
      opacity: 1,
      pointerEvents: 'inherit'
    }
  }
})

export const PreviewView: FC<PreviewViewProps> = ({
  blockType,
  updateEmbedBlockAttributes,
  deleteNode,
  getPos,
  displayName,
  fileName,
  fileType,
  fileUrl,
  previewHtml,
  icon,
  node,
  extension
}) => {
  const isWebsite = fileType === 'html'
  const [actionOptions] = useActionOptions(isWebsite ? undefined : fileUrl)

  return (
    <BlockContainer
      node={node}
      contentForCopy={fileUrl}
      deleteNode={deleteNode}
      editable="custom"
      getPos={getPos}
      actionOptions={actionOptions}
    >
      <DocumentContainer>
        {isWebsite ? (
          <WebsiteDocument
            extension={extension}
            blockType={blockType}
            updateEmbedBlockAttributes={updateEmbedBlockAttributes}
            previewHtml={previewHtml}
            url={fileUrl}
            displayName={displayName}
            icon={icon}
            title={fileName}
          />
        ) : (
          <PdftronDocument
            extension={extension}
            blockType={blockType}
            updateEmbedBlockAttributes={updateEmbedBlockAttributes}
            displayName={displayName}
            fileName={fileName}
            fileUrl={fileUrl}
            fileType={fileType}
          />
        )}
      </DocumentContainer>
    </BlockContainer>
  )
}
