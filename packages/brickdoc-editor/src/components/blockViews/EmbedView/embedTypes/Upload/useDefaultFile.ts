import { useEffect } from 'react'
import { imperativeUpload, ImperativeUploadOptions } from '@brickdoc/uploader'
import { getFileTypeByExtension } from '../../../../../helpers'
import { useExternalProps } from '../../../../../hooks'
import { EmbedViewProps } from '../../../../../extensions/blocks/embed/meta'

export function useDefaultFile(
  node: EmbedViewProps['node'],
  onUploaded: ImperativeUploadOptions['onUploaded'],
  onProgress: ImperativeUploadOptions['onProgress']
): void {
  const externalProps = useExternalProps()

  useEffect(() => {
    const file = node.attrs.defaultFile
    if (!file) return

    const fileType = getFileTypeByExtension(file.name)

    void imperativeUpload(file, {
      prepareFileUpload: externalProps.prepareFileUpload,
      blockId: externalProps.rootId,
      fileType,
      onUploaded,
      onProgress
    })

    node.attrs.defaultFile = null

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
