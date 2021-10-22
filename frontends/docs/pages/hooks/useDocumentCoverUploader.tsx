import { Blocktype, Filesourcetype } from '@/BrickdocGraphQL'
import { useDocsI18n } from '@/docs/common/hooks'
import { PopoverProps } from '@brickdoc/design-system'
import { Dashboard, DashboardProps, ImportSourceOption, UploadResultData } from '@brickdoc/uploader'
import React from 'react'
import { DocumentCoverMeta } from '../components/DocumentTitle/DocumentCover'

export function useDocumentCoverUploader(
  cover: DocumentCoverMeta | null | undefined,
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
    onChange: (icon: DocumentCoverMeta | null | undefined) => void
    onFileLoaded: (localUrl: string) => void
  }
): [DocumentCoverMeta | null | undefined, Partial<PopoverProps>] {
  const { t } = useDocsI18n()
  const IMPORT_SOURCES: ImportSourceOption[] = [
    {
      type: 'gallery'
    },
    {
      type: 'upload',
      acceptType: 'image/*',
      buttonText: t('document_cover.import_sources.upload.button_text'),
      buttonHint: t('document_cover.import_sources.upload.button_hint')
    },
    {
      type: 'link',
      typeLabel: t('document_cover.import_sources.link.type_label'),
      linkInputPlaceholder: t('document_cover.import_sources.link.placeholder'),
      buttonText: t('document_cover.import_sources.link.button_text'),
      buttonHint: t('document_cover.import_sources.link.button_hint')
    },
    {
      type: 'unsplash'
    }
  ]
  const [documentCoverMeta, setDocumentCoverMeta] = React.useState(cover)
  React.useEffect(() => {
    setDocumentCoverMeta(cover)
  }, [cover])

  const onLoaded = (inputFile: File): void => {
    const fr = new FileReader()
    fr.readAsDataURL(inputFile)
    fr.onload = function onload() {
      onFileLoaded(this.result as string)
    }
  }

  const onUploaded = ({ action, url, color, meta }: UploadResultData): void => {
    if (action === 'remove') {
      onChange(null)
      return
    }

    let documentCoverMeta: DocumentCoverMeta

    if (url) {
      documentCoverMeta = {
        __typename: 'BlockImage',
        type: Blocktype.Image,
        // TODO: align types
        source: meta?.source === 'external' ? Filesourcetype.External : Filesourcetype.Origin,
        key: url
      }
    } else if (color) {
      documentCoverMeta = {
        __typename: 'BlockColor',
        type: Blocktype.Color,
        color
      }
    } else {
      return
    }

    onChange(documentCoverMeta)
  }

  const popoverProps: Partial<PopoverProps> = {
    overlayClassName: styles.popover,
    trigger: 'click',
    placement: 'top',
    content: (
      <Dashboard
        blockId={blockId}
        fileType="image"
        prepareFileUpload={prepareFileUpload}
        fetchUnsplashImages={fetchUnsplashImages}
        onUploaded={onUploaded}
        onFileLoaded={onLoaded}
        importSources={IMPORT_SOURCES}
      />
    )
  }

  return [documentCoverMeta, popoverProps]
}
