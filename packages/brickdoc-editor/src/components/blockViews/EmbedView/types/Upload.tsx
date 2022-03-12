import React from 'react'
import { NodeViewProps } from '@tiptap/react'
import { EmbedBlockPlaceholder } from '../Placeholder'
import { Icon, styled } from '@brickdoc/design-system'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { UploadProgress, UploadResultData, imperativeUpload } from '@brickdoc/uploader'
import { getFileTypeByExtension, linkStorage } from '../../../../helpers/file'
import { BlockContainer } from '../../BlockContainer'
import { EditorContext } from '../../../../context/EditorContext'
import { EmbedBlockAttributes } from '../EmbedView'
import { useExternalProps } from '../../../../hooks/useExternalProps'

export interface UploadTypeEmbedBlockProps {
  deleteNode: NodeViewProps['deleteNode']
  node: NodeViewProps['node']
  getPos: NodeViewProps['getPos']
  updateEmbedBlockAttributes: (attrs: EmbedBlockAttributes, type: 'link' | 'image' | 'attachment') => void
}

const FileInput = styled('input', {
  display: 'none'
})

export const UploadTypeEmbedBlock: React.FC<UploadTypeEmbedBlockProps> = ({
  node,
  deleteNode,
  getPos,
  updateEmbedBlockAttributes
}) => {
  const { t } = React.useContext(EditorContext)
  const externalProps = useExternalProps()

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
  const onProgress = (progress: UploadProgress): void => setProgress(progress)

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
        prepareFileUpload: externalProps.prepareFileUpload,
        blockId: externalProps.rootId,
        fileType,
        onUploaded,
        onProgress
      })
    },
    [externalProps.prepareFileUpload, externalProps.rootId, onUploaded]
  )
  const handleChooseFile = React.useCallback(() => {
    inputRef.current?.click()
  }, [])

  React.useEffect(() => {
    const uploadDefaultFile = (): void => {
      const file = node.attrs.defaultFile as File
      const fileType = getFileTypeByExtension(file.name)
      void imperativeUpload(file, {
        prepareFileUpload: externalProps.prepareFileUpload,
        blockId: externalProps.rootId,
        fileType,
        onUploaded,
        onProgress
      })
      node.attrs.defaultFile = null
    }
    if (node.attrs.defaultFile) {
      uploadDefaultFile()
      return
    }

    if (!node.attrs.defaultFile && node.attrs.isNew) {
      handleChooseFile()
      node.attrs.isNew = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BlockContainer actionOptions={['delete']} deleteNode={deleteNode} getPos={getPos}>
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
