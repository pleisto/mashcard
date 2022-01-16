import React from 'react'
import { NodeViewProps } from '@tiptap/react'
import { EmbedBlockPlaceholder } from '../Placeholder'
import { Icon, styled } from '@brickdoc/design-system'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { UploadProgress, UploadResultData, imperativeUpload } from '@brickdoc/uploader'
import { getFileTypeByExtension, linkStorage } from '../../../helpers/file'
import { BlockContainer } from '../../../components'
import { EditorContext } from '../../../context/EditorContext'
import { EditorDataSourceContext } from '../../../dataSource/DataSource'
import { EmbedBlockAttributes } from '../EmbedBlock'

export interface UploadTypeEmbedBlockProps {
  deleteNode: NodeViewProps['deleteNode']
  node: NodeViewProps['node']
  updateEmbedBlockAttributes: (attrs: EmbedBlockAttributes, type: 'link' | 'image' | 'attachment') => void
}

const FileInput = styled('input', {
  display: 'none'
})

export const UploadTypeEmbedBlock: React.FC<UploadTypeEmbedBlockProps> = ({
  node,
  deleteNode,
  updateEmbedBlockAttributes
}) => {
  const { t } = React.useContext(EditorContext)
  const editorDataSource = React.useContext(EditorDataSourceContext)

  const onUploaded = React.useCallback(
    (data: UploadResultData): void => {
      linkStorage.set(node.attrs.uuid, data.downloadUrl ?? '')
      const fileType = getFileTypeByExtension(data.meta?.name ?? '')
      updateEmbedBlockAttributes(
        { key: data.url!, source: 'ORIGIN', size: data.meta?.size, name: data.meta?.name },
        fileType === 'image' ? 'image' : 'attachment'
      )
    },
    [node.attrs.uuid, updateEmbedBlockAttributes]
  )

  const [progress, setProgress] = React.useState<UploadProgress>()
  const onProgress = React.useCallback((progress: UploadProgress): void => setProgress(progress), [])

  const inputRef = React.useRef<HTMLInputElement>(null)
  const handleFileInputChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    event => {
      const file = event.target.files?.[0]
      // We clear the input after a file is selected, because otherwise
      // change event is not fired in Chrome and Safari when a file
      // with the same name is selected.
      event.target.value = ''

      if (!file) return
      const fileType = getFileTypeByExtension(file.name)
      void imperativeUpload(file, {
        prepareFileUpload: editorDataSource.prepareFileUpload,
        blockId: node.attrs.uuid,
        fileType,
        onUploaded,
        onProgress
      })
    },
    [editorDataSource.prepareFileUpload, node.attrs.uuid, onProgress, onUploaded]
  )
  const handleChooseFile = React.useCallback(() => {
    inputRef.current?.click()
  }, [])

  React.useEffect(() => {
    if (node.attrs.isNew) {
      handleChooseFile()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BlockContainer actionOptions={['delete']} deleteNode={deleteNode}>
      <EmbedBlockPlaceholder
        data-testid={TEST_ID_ENUM.editor.embedBlock.addButton.id}
        icon={<Icon.Upload />}
        label={t('embed_block.types.upload.label')}
        description={t('embed_block.types.upload.description')}
        progress={progress}
        onClick={handleChooseFile}
      />
      <FileInput ref={inputRef} type="file" multiple={false} onChange={handleFileInputChange} />
    </BlockContainer>
  )
}
