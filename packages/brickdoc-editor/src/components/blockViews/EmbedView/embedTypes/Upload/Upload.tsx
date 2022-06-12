import { FC, useRef } from 'react'
import { styled } from '@brickdoc/design-system'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { EmbedBlockPlaceholder } from '../../Placeholder'
import { BlockContainer } from '../../../BlockContainer'
import { EmbedViewProps } from '../../../../../extensions/blocks/embed/meta'
import { useFileIcon } from './useFileIcon'
import { useEditorI18n } from '../../../../../hooks'
import { UpdateEmbedBlockAttributes } from '../../EmbedView'
import { useUploadProgress } from './useUploadPorgress'
import { sizeFormat } from '../../../../../helpers'

export interface UploadTypeEmbedBlockProps {
  deleteNode: EmbedViewProps['deleteNode']
  node: EmbedViewProps['node']
  extension: EmbedViewProps['extension']
  getPos: EmbedViewProps['getPos']
  updateEmbedBlockAttributes: UpdateEmbedBlockAttributes
}

const FileInput = styled('input', {
  display: 'none'
})

export const UploadTypeEmbedBlock: FC<UploadTypeEmbedBlockProps> = ({
  node,
  deleteNode,
  getPos,
  extension,
  updateEmbedBlockAttributes
}) => {
  const [t] = useEditorI18n()
  const inputRef = useRef<HTMLInputElement>(null)

  const { progress, onChooseFile, onFileInputChange, file, fileType } = useUploadProgress(
    node,
    extension,
    updateEmbedBlockAttributes,
    inputRef
  )

  const icon = useFileIcon(fileType)
  const label = file?.name ?? t('embed_block.embed_types.upload.label')
  const description = file
    ? `${sizeFormat(file.size)} - ${Math.floor(
        (100 * (progress?.bytesUploaded ?? 0)) / (progress?.bytesTotal ?? Infinity)
      )}%`
    : t('embed_block.embed_types.upload.description')

  return (
    <BlockContainer node={node} actionOptions={['delete']} deleteNode={deleteNode} getPos={getPos}>
      <EmbedBlockPlaceholder
        data-testid={TEST_ID_ENUM.editor.embedBlock.addButton.id}
        icon={icon}
        label={label ?? ''}
        description={description}
        progress={progress}
        onClick={onChooseFile}
      />
      <FileInput ref={inputRef} type="file" multiple={false} onChange={onFileInputChange} />
    </BlockContainer>
  )
}
