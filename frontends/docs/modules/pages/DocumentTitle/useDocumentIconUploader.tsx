import { Blocktype, Filesourcetype } from '@/BrickdocGraphQL'
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
    acceptType: 'image/*',
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
        type: Blocktype.Image,
        source: meta?.source === 'external' ? Filesourcetype.External : Filesourcetype.Origin,
        key: url
      }
    } else if (emoji) {
      documentIconMeta = {
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
