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

export function usePrepareFileUpload(): EditorOptions['prepareFileUpload'] {
  const [directUpload] = useCreateDirectUploadMutation()

  return async (type, file: File) => {
    let inputType: Upload

    switch (type) {
      case 'image':
      default:
        // TODO: add a new type for image
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
          type: inputType
        }
      }
      // TODO: handle error
    }).then(result => {
      return {
        endpoint: result.data.createDirectUpload.directUpload.url,
        headers: {
          ...JSON.parse(result.data.createDirectUpload.directUpload.headers)
        }
      }
    })
  }
}
