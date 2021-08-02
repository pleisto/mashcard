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
    prepareFileUpload,
    fetchUnsplashImages,
    styles,
    onChange
  }: {
    prepareFileUpload: DashboardProps['prepareFileUpload']
    fetchUnsplashImages: DashboardProps['fetchUnsplashImages']
    styles: any
    onChange: (icon: DocumentCoverMeta | null | undefined) => void
  }
): [DocumentCoverMeta | null | undefined, Partial<PopoverProps>] {
  const [documentCoverMeta, setDocumentCoverMeta] = React.useState(cover)
  React.useEffect(() => {
    setDocumentCoverMeta(cover)
  }, [cover])

  const onFileLoaded = (inputFile: File): void => {
    const fr = new FileReader()
    fr.readAsDataURL(inputFile)
    fr.onload = function onload() {
      onChange({
        type: 'image',
        url: this.result as string
      })
    }
  }

  const onUploaded = ({ action, url, color }: UploadResultData): void => {
    if (action === 'remove') {
      onChange(null)
      return
    }

    let type = ''

    if (url) type = 'image'
    if (color) type = 'color'

    if (!type) return

    onChange({
      type: type as DocumentCoverMeta['type'],
      url,
      color
    })
  }

  const popoverProps: Partial<PopoverProps> = {
    overlayClassName: styles.popover,
    trigger: 'click',
    placement: 'top',
    content: (
      <Dashboard
        fileType="image"
        prepareFileUpload={prepareFileUpload}
        fetchUnsplashImages={fetchUnsplashImages}
        onUploaded={onUploaded}
        onFileLoaded={onFileLoaded}
        importSources={IMPORT_SOURCES}
      />
    )
  }

  return [documentCoverMeta, popoverProps]
}
