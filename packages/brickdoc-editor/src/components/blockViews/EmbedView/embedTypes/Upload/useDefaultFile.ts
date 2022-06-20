import { useEffect } from 'react'
import { imperativeUpload, ImperativeUploadOptions } from '@brickdoc/uploader'
import { getFileTypeByExtension } from '../../../../../helpers'
import { EmbedViewProps } from '../../../../../extensions/blocks/embed/meta'

export function useDefaultFile({
  node,
  extension,
  onUploaded,
  onProgress
}: {
  node: EmbedViewProps['node']
  extension: EmbedViewProps['extension']
  onUploaded: ImperativeUploadOptions['onUploaded']
  onProgress: ImperativeUploadOptions['onProgress']
}): void {
  useEffect(() => {
    const file = node.attrs.defaultFile
    if (!file || !extension.options.prepareFileUpload) return

    const fileType = getFileTypeByExtension(file.name)

    void imperativeUpload(file, {
      prepareFileUpload: async (blockId, type, file) => await extension.options.prepareFileUpload!(type, file),
      blockId: undefined,
      fileType,
      onUploaded,
      onProgress
    })

    node.attrs.defaultFile = null

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
