import { PopoverProps } from '@brickdoc/design-system'
import { Dashboard, DashboardProps, ImportSourceOption, UploadResultData } from '@brickdoc/uploader'
import React from 'react'
import { DocumentIconMeta } from './DocumentIcon'

const ICON_IMPORT_SOURCES: ImportSourceOption[] = [
  {
    type: 'emoji'
  },
  {
    type: 'upload',
    typeLabel: 'Upload an Image',
    buttonText: 'Choose an image',
    buttonHint: 'Recommended size is 280x280 pixels'
  },
  {
    type: 'link',
    typeLabel: 'Link',
    linkInputPlaceholder: 'Paste an image link...',
    buttonText: 'Submit',
    buttonHint: 'Works with any image from the web'
  }
]

export function useDocumentIconUploader(
  icon: DocumentIconMeta | null | undefined,
  {
    prepareFileUpload,
    fetchUnsplashImages,
    styles,
    onChange
  }: {
    prepareFileUpload: DashboardProps['prepareFileUpload']
    fetchUnsplashImages: DashboardProps['fetchUnsplashImages']
    styles: any
    onChange: (icon: DocumentIconMeta | null | undefined) => void
  }
): [DocumentIconMeta | undefined | null, Partial<PopoverProps>] {
  const [documentIconMeta, setDocumentIconMeta] = React.useState(icon)
  React.useEffect(() => {
    setDocumentIconMeta(icon)
  }, [icon])

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

  const onUploaded = ({ action, url, emoji }: UploadResultData): void => {
    if (action === 'remove') {
      onChange(null)
      return
    }

    let type = ''

    if (url) type = 'image'
    if (emoji) type = 'emoji'

    if (!type) return

    onChange({
      type: type as DocumentIconMeta['type'],
      url,
      emoji
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
        importSources={ICON_IMPORT_SOURCES}
      />
    )
  }

  return [documentIconMeta, popoverProps]
}
