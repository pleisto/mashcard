import { Blocktype, Filesourcetype } from '@/BrickdocGraphQL'
import { useDocsI18n } from '@/docs/common/hooks'
import { PopoverProps } from '@brickdoc/design-system'
import { Dashboard, DashboardProps, ImportSourceOption, UploadResultData } from '@brickdoc/uploader'
import React from 'react'
import { DocumentIconMeta } from '../components/DocumentTitle/DocumentIcon'

export function useDocumentIconUploader(
  icon: DocumentIconMeta | null | undefined,
  {
    blockId,
    prepareFileUpload,
    fetchUnsplashImages,
    styles,
    onChange,
    onFileLoaded
  }: {
    blockId: string
    prepareFileUpload: DashboardProps['prepareFileUpload']
    fetchUnsplashImages: DashboardProps['fetchUnsplashImages']
    styles: any
    onChange: (icon: DocumentIconMeta | null | undefined) => void
    onFileLoaded: (localUrl: string) => void
  }
): [DocumentIconMeta | undefined | null, Partial<PopoverProps>] {
  const { t } = useDocsI18n()
  const ICON_IMPORT_SOURCES: ImportSourceOption[] = [
    {
      type: 'emoji'
    },
    {
      type: 'upload',
      typeLabel: t('document_icon.import_sources.upload.type_label'),
      acceptType: 'image/*',
      buttonText: t('document_icon.import_sources.upload.button_text'),
      buttonHint: t('document_icon.import_sources.upload.button_hint')
    },
    {
      type: 'link',
      typeLabel: t('document_icon.import_sources.link.type_label'),
      linkInputPlaceholder: t('document_icon.import_sources.link.placeholder'),
      buttonText: t('document_icon.import_sources.link.button_text'),
      buttonHint: t('document_icon.import_sources.link.button_hint')
    }
  ]
  const [documentIconMeta, setDocumentIconMeta] = React.useState(icon)
  React.useEffect(() => {
    setDocumentIconMeta(icon)
  }, [icon])

  const onLoaded = (inputFile: File): void => {
    const fr = new FileReader()
    fr.readAsDataURL(inputFile)
    fr.onload = function onload() {
      onFileLoaded(this.result as string)
    }
  }

  const onUploaded = ({ action, url, emoji, meta }: UploadResultData): void => {
    if (action === 'remove') {
      onChange(null)
      return
    }

    let documentIconMeta: DocumentIconMeta

    if (url) {
      documentIconMeta = {
        __typename: 'BlockImage',
        type: Blocktype.Image,
        source: meta?.source === 'external' ? Filesourcetype.External : Filesourcetype.Origin,
        key: url
      }
    } else if (emoji) {
      documentIconMeta = {
        __typename: 'BlockEmoji',
        type: Blocktype.Emoji,
        name: emoji.name,
        emoji: emoji.emoji
      }
    } else {
      return
    }

    onChange(documentIconMeta)
  }

  const popoverProps: Partial<PopoverProps> = {
    overlayClassName: styles.popover,
    trigger: 'click',
    placement: 'top',
    destroyTooltipOnHide: true,
    content: (
      <Dashboard
        blockId={blockId}
        fileType="image"
        prepareFileUpload={prepareFileUpload}
        fetchUnsplashImages={fetchUnsplashImages}
        onUploaded={onUploaded}
        onFileLoaded={onLoaded}
        importSources={ICON_IMPORT_SOURCES}
      />
    )
  }

  return [documentIconMeta, popoverProps]
}
