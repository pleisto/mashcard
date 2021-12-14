import React from 'react'
import { NodeViewProps } from '@tiptap/react'
import { Button, Icon, Popover } from '@brickdoc/design-system'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { Dashboard, ImportSourceOption, UploadProgress, UploadResultData } from '@brickdoc/uploader'
import { prependHttp } from '../../../../helpers/prependHttp'
import { WebsiteMeta } from '../..'
import { linkStorage, sizeFormat } from '../../../../helpers/file'
import { useEditorI18n } from '../../../..'

export interface UploaderModeProps {
  node: NodeViewProps['node']
  extension: NodeViewProps['extension']
  updateLinkBlockAttributes: (attrs: Record<string, any>, type: 'link' | 'attachment') => void
}

export const UploaderMode: React.FC<UploaderModeProps> = ({ node, extension, updateLinkBlockAttributes }) => {
  const [t] = useEditorI18n()
  const onUploaded = (data: UploadResultData): void => {
    // external link
    if (data.meta?.source === 'external') {
      data.url = prependHttp(data.url ?? '')
      extension.options.fetchWebsiteMeta(data.url).then(({ success, data }: { success: boolean; data: WebsiteMeta }) => {
        if (!success) return
        updateLinkBlockAttributes({ ...data }, 'link')
      })

      linkStorage.set(node.attrs.uuid, null)
      updateLinkBlockAttributes({ key: data.url, source: data.meta?.source.toUpperCase() }, 'link')

      return
    }

    linkStorage.set(node.attrs.uuid, data.downloadUrl ?? '')
    updateLinkBlockAttributes(
      { key: data.url, source: data.meta?.source.toUpperCase(), size: data.meta?.size, name: data.meta?.name },
      'attachment'
    )
  }

  const [progress, setProgress] = React.useState<UploadProgress>()
  const onProgress = (progress: UploadProgress): void => setProgress(progress)

  const importSources: ImportSourceOption[] = [
    {
      type: 'link',
      linkInputPlaceholder: t('link_block.import_sources.link.placeholder'),
      buttonText: t('link_block.import_sources.link.button_text'),
      buttonHint: t('link_block.import_sources.link.button_hint')
    },
    {
      type: 'upload',
      buttonText: t('link_block.import_sources.upload.button_text'),
      buttonHint: t('link_block.import_sources.upload.button_hint')
    }
  ]

  return (
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
          prepareFileUpload={extension.options.prepareFileUpload}
        />
      }>
      <Button data-testid={TEST_ID_ENUM.editor.linkBlock.addButton.id} type="text" className="brickdoc-link-block-placeholder">
        <div className="link-block-progressing" style={{ width: `${progress?.percentage ?? 0}%` }} />
        <Icon.PaperClip className="link-block-icon" />
        <div className="link-block-content">
          {progress ? progress.name : t('link_block.hint')}
          {!progress && <div className="link-block-desc">{t('link_block.desc')}</div>}
          {progress && (
            <div className="link-block-desc">
              {sizeFormat(progress.bytesTotal)} - {progress.percentage}%
            </div>
          )}
        </div>
      </Button>
    </Popover>
  )
}
