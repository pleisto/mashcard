import { FC, useCallback, useContext, useMemo, useState } from 'react'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { NodeViewProps } from '@tiptap/react'
import { Button, Icon, Popover } from '@brickdoc/design-system'
import { BlockContainer } from '../../../BlockContainer'
import { Dashboard, ImportSourceOption, UploadProgress, UploadResultData } from '@brickdoc/uploader'
import { linkStorage, sizeFormat } from '../../../../../helpers/file'
import { EditorContext } from '../../../../../context/EditorContext'
import { useExternalProps } from '../../../../../hooks/useExternalProps'

export interface UploaderModeProps {
  node: NodeViewProps['node']
  deleteNode: NodeViewProps['deleteNode']
  getPos: NodeViewProps['getPos']
  updateImageAttributes: (attrs: Record<string, any>) => void
}

export const UploaderMode: FC<UploaderModeProps> = ({ node, deleteNode, getPos, updateImageAttributes }) => {
  const externalProps = useExternalProps()
  const { t } = useContext(EditorContext)

  const onUploaded = useCallback(
    (data: UploadResultData): void => {
      linkStorage.set(node.attrs.uuid, data.viewUrl!)
      updateImageAttributes({ key: data.url, source: data.meta?.source.toUpperCase() })
    },
    [node.attrs.uuid, updateImageAttributes]
  )
  const [progress, setProgress] = useState<UploadProgress>()
  const onProgress = useCallback((progress: UploadProgress): void => setProgress(progress), [])

  const importSources = useMemo<ImportSourceOption[]>(
    () => [
      {
        type: 'link',
        linkInputPlaceholder: t('image_block.import_sources.link.placeholder'),
        buttonText: t('image_block.import_sources.link.button_text'),
        buttonHint: t('image_block.import_sources.link.button_hint'),
        invalidImageUrlMessage: t('document_cover.import_sources.link.invalidImageUrlMessage')
      },
      {
        type: 'upload',
        buttonText: t('image_block.import_sources.upload.button_text'),
        acceptType: 'image/*'
      },
      {
        type: 'unsplash'
      }
    ],
    [t]
  )

  return (
    <BlockContainer node={node} deleteNode={deleteNode} getPos={getPos} actionOptions={['delete']}>
      <Popover
        overlayClassName="brickdoc-block-image-section-popover"
        trigger="click"
        placement="bottom"
        defaultVisible={node.attrs.isNew}
        content={
          <Dashboard
            fileType="image"
            blockId={node.attrs.uuid}
            prepareFileUpload={externalProps.prepareFileUpload}
            fetchUnsplashImages={externalProps.fetchUnsplashImages}
            onUploaded={onUploaded}
            onProgress={onProgress}
            importSources={importSources}
          />
        }
      >
        <Button
          type="text"
          className="brickdoc-block-image-section"
          data-testid={TEST_ID_ENUM.editor.imageBlock.addButton.id}
        >
          <div className="image-section-progressing" style={{ width: `${progress?.percentage ?? 0}%` }} />
          <Icon.Image className="image-section-icon" />
          <div className="image-section-content">
            {progress ? progress.name : t('image_block.hint')}
            {progress && (
              <div className="image-section-desc">
                {sizeFormat(progress.bytesTotal)} - {progress.percentage}%
              </div>
            )}
          </div>
        </Button>
      </Popover>
    </BlockContainer>
  )
}
