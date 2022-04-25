import { FC } from 'react'
import { FileType } from '../../../../../helpers/file'
import { useActionOptions } from '../useActionOptions'
import { BlockContainer } from '../../../BlockContainer'
import { EmbedViewProps } from '../../../../../extensions/blocks/embed/meta'
import { EmbedBlockType, UpdateEmbedBlockAttributes } from '../../EmbedView'
import { PdftronDocument } from './PdftronDocument/PdftronDocument'
import { WebsiteDocument } from './WebsiteDocument'

export interface CardViewProps {
  blockType: EmbedBlockType
  deleteNode: EmbedViewProps['deleteNode']
  getPos: EmbedViewProps['getPos']
  node: EmbedViewProps['node']
  updateEmbedBlockAttributes: UpdateEmbedBlockAttributes
  fileName: string
  fileType: FileType
  fileUrl: string
  icon?: string | null
}

export const CardView: FC<CardViewProps> = ({
  blockType,
  updateEmbedBlockAttributes,
  deleteNode,
  getPos,
  fileName,
  fileType,
  fileUrl,
  icon,
  node
}) => {
  const [actionOptions] = useActionOptions()
  const isWebsite = fileType === 'html'

  return (
    <BlockContainer
      node={node}
      contentForCopy={fileUrl}
      deleteNode={deleteNode}
      getPos={getPos}
      actionOptions={actionOptions}
    >
      {isWebsite && (
        <WebsiteDocument
          blockType={blockType}
          updateEmbedBlockAttributes={updateEmbedBlockAttributes}
          url={fileUrl}
          icon={icon}
          title={fileName}
        />
      )}
      {!isWebsite && <PdftronDocument fileName={fileName} fileUrl={fileUrl} fileType={fileType} />}
    </BlockContainer>
  )
}
