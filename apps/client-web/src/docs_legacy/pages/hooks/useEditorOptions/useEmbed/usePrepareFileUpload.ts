import { useCallback } from 'react'
import { Upload, useCreateDirectUploadMutation } from '@/MashcardGraphQL'
import { EmbedOptions } from '@mashcard/editor'
import { checksum } from '../../usePrepareFileUpload'
import { DocMeta } from '@/docs_legacy/store/DocMeta'
import { CreateDirectUploadInput } from '@mashcard/schema'

export function usePrepareFileUpload(docMeta: DocMeta): EmbedOptions['prepareFileUpload'] {
  const [directUpload] = useCreateDirectUploadMutation()

  return useCallback<NonNullable<EmbedOptions['prepareFileUpload']>>(
    async (type, file) => {
      let inputType: Upload

      switch (type) {
        // TODO: add new types for pdf/image
        case 'pdf':
        case 'image':
        default:
          inputType = Upload.Doc
      }

      if (!docMeta.id && type === 'image') {
        inputType = Upload.Avatar
      }

      const input: CreateDirectUploadInput['input'] = {
        filename: file.name,
        byteSize: file.size,
        contentType: file.type,
        checksum: await checksum(file)
      }

      // eslint-disable-next-line @typescript-eslint/return-await
      return await directUpload({
        variables: {
          input: {
            input,
            type: inputType,
            blockId: docMeta.id
          }
        }
        // TODO: handle error
      }).then(result => {
        if (!result.data?.createDirectUpload) {
          throw new Error('prepare upload failed')
        }

        const directUpload = result.data.createDirectUpload.directUpload

        return {
          endpoint: directUpload.uploadUrl,
          blobKey: directUpload.blobKey,
          headers: directUpload.headers,
          signedId: directUpload.signedId,
          downloadUrl: directUpload.downloadUrl,
          viewUrl: directUpload.viewUrl
        }
      })
    },
    [directUpload, docMeta.id]
  )
}
