import { Upload, useCreateDirectUploadMutation } from '@/BrickdocGraphQL'
import { EditorOptions } from '@brickdoc/editor'
import { FileChecksum } from '@rails/activestorage/src/file_checksum'

const checksum = async (file: File): Promise<string> =>
  await new Promise((resolve, reject) => {
    FileChecksum.create(file, (error, checksum) => {
      if (error) {
        reject(error)
        return
      }

      resolve(checksum)
    })
  })

export function usePrepareFileUpload(): Exclude<EditorOptions['prepareFileUpload'], undefined> {
  const [directUpload] = useCreateDirectUploadMutation()

  return async (blockId: string, type: string, file: File) => {
    let inputType: Upload

    switch (type) {
      // TODO: add new types for pdf/image
      case 'pdf':
      case 'image':
      default:
        inputType = Upload.Doc
    }

    if (!blockId && type === 'image') {
      inputType = Upload.Avatar
    }

    const input = {
      filename: file.name,
      byteSize: file.size,
      contentType: file.type,
      checksum: await checksum(file)
    }

    return await directUpload({
      variables: {
        input: {
          input,
          type: inputType,
          blockId
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
        viewUrl: directUpload.viewUrl
      }
    })
  }
}
