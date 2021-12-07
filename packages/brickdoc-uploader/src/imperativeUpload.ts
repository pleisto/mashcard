import { Uppy, UppyFile } from '@uppy/core'
import XhrUploadPlugin from '@uppy/xhr-upload'
import { DashboardPluginOptions } from './Dashboard/plugin'

export interface ImperativeUploadOptions {
  blockId?: DashboardPluginOptions['blockId']
  onUploaded?: DashboardPluginOptions['onUploaded']
  onFileLoaded?: DashboardPluginOptions['onFileLoaded']
  prepareFileUpload?: DashboardPluginOptions['prepareFileUpload']
  fileType: DashboardPluginOptions['fileType']
}

export const imperativeUpload = async (
  file: File,
  { prepareFileUpload, blockId, fileType, onFileLoaded, onUploaded }: ImperativeUploadOptions
): Promise<void> => {
  const uppy = new Uppy()
  uppy.use(XhrUploadPlugin, {
    endpoint: '/',
    method: 'PUT',
    formData: false,
    getResponseData: () => ({
      url: ''
    })
  })

  const handleUploadSuccess = (file: UppyFile): void => {
    onUploaded({
      action: 'add',
      url: uploadMeta.blobKey,
      signedId: uploadMeta.signedId,
      viewUrl: uploadMeta.viewUrl,
      meta: {
        source: 'origin'
      }
    })
    uppy.close()
  }

  uppy.on('upload-success', handleUploadSuccess)

  const descriptor = {
    source: 'imperativeUpload',
    name: file.name,
    type: file.type,
    data: file
  }

  try {
    uppy.addFile(descriptor)
  } catch (err) {
    uppy.log(err as string)
  }

  const { endpoint, headers, blobKey, viewUrl, signedId } = await prepareFileUpload(blockId, fileType, file)
  const uploadMeta = {
    blobKey,
    viewUrl,
    signedId
  }
  uppy.getPlugin('XHRUpload').setOptions({
    endpoint,
    headers
  })

  onFileLoaded?.(file)

  await uppy.upload()
}
