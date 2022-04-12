import { useCallback, ChangeEventHandler, FC, useContext, useRef, useState } from 'react'
import { EmbedBlockPlaceholder } from '../Placeholder'
import { Icon, styled } from '@brickdoc/design-system'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { UploadProgress, UploadResultData, imperativeUpload } from '@brickdoc/uploader'
import { getFileTypeByExtension, linkStorage } from '../../../../helpers/file'
import { BlockContainer } from '../../BlockContainer'
import { EditorContext } from '../../../../context/EditorContext'
import { EmbedBlockAttributes } from '../EmbedView'
import { useExternalProps } from '../../../../hooks/useExternalProps'
import { EmbedViewProps } from '../../../../extensions/blocks/embed/meta'
import { useDefaultFile } from './useDefaultFile'
import { useBlockJustCreated } from './useBlockJustCreated'

export interface UploadTypeEmbedBlockProps {
  deleteNode: EmbedViewProps['deleteNode']
  node: EmbedViewProps['node']
  getPos: EmbedViewProps['getPos']
  updateEmbedBlockAttributes: (attrs: EmbedBlockAttributes, type: 'link' | 'image' | 'attachment') => void
}

const FileInput = styled('input', {
  display: 'none'
})

export const UploadTypeEmbedBlock: FC<UploadTypeEmbedBlockProps> = ({
  node,
  deleteNode,
  getPos,
  updateEmbedBlockAttributes
}) => {
  const { t } = useContext(EditorContext)
  const externalProps = useExternalProps()

  const onUploaded = useCallback(
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

  const [progress, setProgress] = useState<UploadProgress>()
  const onProgress = (progress: UploadProgress): void => setProgress(progress)

  const inputRef = useRef<HTMLInputElement>(null)
  const handleFileInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
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
  const handleChooseFile = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const handleBlockJustCreated = useCallback(() => {
    if (node.attrs.defaultFile) return
    handleChooseFile()
  }, [handleChooseFile, node.attrs.defaultFile])

  useBlockJustCreated(node.attrs.uuid, handleBlockJustCreated)
  useDefaultFile(node, onUploaded, onProgress)

  return (
    <BlockContainer node={node} actionOptions={['delete']} deleteNode={deleteNode} getPos={getPos}>
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
