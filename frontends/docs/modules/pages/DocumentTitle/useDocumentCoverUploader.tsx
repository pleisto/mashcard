import { Blocktype, Filesourcetype } from '@/BrickdocGraphQL'
import { PopoverProps } from '@brickdoc/design-system'
import { Dashboard, DashboardProps, ImportSourceOption, UploadResultData } from '@brickdoc/uploader'
import React from 'react'
import { DocumentCoverMeta } from './DocumentCover'

const IMPORT_SOURCES: ImportSourceOption[] = [
  {
    type: 'gallery'
  },
  {
    type: 'upload',
    acceptType: 'image/*',
    buttonText: 'Choose an image',
    buttonHint: 'Images wider than 1500 pixels work best.'
  },
  {
    type: 'link',
    typeLabel: 'Link',
    linkInputPlaceholder: 'Paste an image link...',
    buttonText: 'Submit',
    buttonHint: 'Works with any image from the web'
  },
  {
    type: 'unsplash'
  }
]

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
        type: Blocktype.Image,
        // TODO: align types
        source: meta?.source === 'external' ? Filesourcetype.External : Filesourcetype.Origin,
        key: url
      }
    } else if (color) {
      documentCoverMeta = {
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
