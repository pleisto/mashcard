import React from 'react'
import { NodeViewProps } from '@tiptap/react'
import { Button, Icon, Popover } from '@brickdoc/design-system'
import { BlockContainer } from '../../../../components'
import { Dashboard, ImportSourceOption, UploadProgress, UploadResultData } from '@brickdoc/uploader'
import { EditorDataSourceContext } from '../../../../dataSource/DataSource'
import { linkStorage, sizeFormat } from '../../../../helpers/file'
import { EditorContext } from '../../../../context/EditorContext'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'

export interface UploaderModeProps {
  node: NodeViewProps['node']
  deleteNode: NodeViewProps['deleteNode']
  getPos: NodeViewProps['getPos']
  updateImageAttributes: (attrs: Record<string, any>) => void
}

export const UploaderMode: React.FC<UploaderModeProps> = ({ node, deleteNode, getPos, updateImageAttributes }) => {
  const editorDataSource = React.useContext(EditorDataSourceContext)
  const { t } = React.useContext(EditorContext)

  const onUploaded = React.useCallback(
    (data: UploadResultData): void => {
      linkStorage.set(node.attrs.uuid, data.viewUrl!)
      updateImageAttributes({ key: data.url, source: data.meta?.source.toUpperCase() })
    },
    [node.attrs.uuid, updateImageAttributes]
  )
  const [progress, setProgress] = React.useState<UploadProgress>()
  const onProgress = React.useCallback((progress: UploadProgress): void => setProgress(progress), [])

  const importSources = React.useMemo<ImportSourceOption[]>(
    () => [
      {
        type: 'link',
        linkInputPlaceholder: t('image_block.import_sources.link.placeholder'),
        buttonText: t('image_block.import_sources.link.button_text'),
        buttonHint: t('image_block.import_sources.link.button_hint')
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
    <BlockContainer deleteNode={deleteNode} getPos={getPos} actionOptions={['delete']}>
      <Popover
        overlayClassName="brickdoc-block-image-section-popover"
        trigger="click"
        placement="bottom"
        defaultVisible={node.attrs.isNew}
        content={
          <Dashboard
            fileType="image"
            blockId={node.attrs.uuid}
            prepareFileUpload={editorDataSource.prepareFileUpload}
            fetchUnsplashImages={editorDataSource.fetchUnsplashImages}
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
