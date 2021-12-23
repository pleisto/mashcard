import React from 'react'
import { NodeViewProps } from '@tiptap/react'
import { Button, Icon, Popover } from '@brickdoc/design-system'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { Dashboard, ImportSourceOption, UploadProgress, UploadResultData } from '@brickdoc/uploader'
import { prependHttp } from '../../../../helpers/prependHttp'
import { linkStorage, sizeFormat } from '../../../../helpers/file'
import { EditorDataSourceContext, WebsiteMeta } from '../../../../dataSource/DataSource'
import { BlockContainer } from '../../../../components'
import { EditorContext } from '../../../../context/EditorContext'

export interface UploaderModeProps {
  editor: NodeViewProps['editor']
  deleteNode: NodeViewProps['deleteNode']
  node: NodeViewProps['node']
  updateEmbedBlockAttributes: (attrs: Record<string, any>, type: 'link' | 'attachment') => void
}

export const UploaderMode: React.FC<UploaderModeProps> = ({ node, deleteNode, editor, updateEmbedBlockAttributes }) => {
  const { t } = React.useContext(EditorContext)
  const editorDataSource = React.useContext(EditorDataSourceContext)

  const onUploaded = React.useCallback(
    (data: UploadResultData): void => {
      // external link
      if (data.meta?.source === 'external') {
        data.url = prependHttp(data.url ?? '')
        void editorDataSource
          .fetchWebsiteMeta(data.url)
          .then(({ success, data }: { success: boolean; data: WebsiteMeta }) => {
            if (!success) return
            updateEmbedBlockAttributes({ ...data }, 'link')
          })

        linkStorage.set(node.attrs.uuid, null)
        updateEmbedBlockAttributes({ key: data.url, source: data.meta?.source.toUpperCase() }, 'link')

        return
      }

      linkStorage.set(node.attrs.uuid, data.downloadUrl ?? '')
      updateEmbedBlockAttributes(
        { key: data.url, source: data.meta?.source.toUpperCase(), size: data.meta?.size, name: data.meta?.name },
        'attachment'
      )
    },
    [editorDataSource, node.attrs.uuid, updateEmbedBlockAttributes]
  )

  const [progress, setProgress] = React.useState<UploadProgress>()
  const onProgress = React.useCallback((progress: UploadProgress): void => setProgress(progress), [])

  const importSources = React.useMemo<ImportSourceOption[]>(
    () => [
      {
        type: 'link',
        linkInputPlaceholder: t('embed_block.import_sources.link.placeholder'),
        buttonText: t('embed_block.import_sources.link.button_text'),
        buttonHint: t('embed_block.import_sources.link.button_hint')
      },
      {
        type: 'upload',
        buttonText: t('embed_block.import_sources.upload.button_text'),
        buttonHint: t('embed_block.import_sources.upload.button_hint')
      }
    ],
    [t]
  )

  return (
    <BlockContainer actionOptions={['delete']} deleteNode={deleteNode}>
      <Popover
        overlayClassName="brickdoc-link-block-popover"
        trigger="click"
        placement="bottom"
        defaultVisible={node.attrs.isNew}
        content={
          <Dashboard
            blockId={node.attrs.uuid}
            onUploaded={onUploaded}
            onProgress={onProgress}
            importSources={importSources}
            prepareFileUpload={editorDataSource.prepareFileUpload}
          />
        }
      >
        <Button
          data-testid={TEST_ID_ENUM.editor.embedBlock.addButton.id}
          type="text"
          className="brickdoc-link-block-placeholder"
        >
          <div className="link-block-progressing" style={{ width: `${progress?.percentage ?? 0}%` }} />
          <Icon.PaperClip className="link-block-icon" />
          <div className="link-block-content">
            {progress ? progress.name : t('embed_block.hint')}
            {!progress && <div className="link-block-desc">{t('embed_block.desc')}</div>}
            {progress && (
              <div className="link-block-desc">
                {sizeFormat(progress.bytesTotal)} - {progress.percentage}%
              </div>
            )}
          </div>
        </Button>
      </Popover>
    </BlockContainer>
  )
}
