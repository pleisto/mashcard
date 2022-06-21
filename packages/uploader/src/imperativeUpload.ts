import { FileProgress, Uppy, UppyFile } from '@uppy/core'
import XhrUploadPlugin from '@uppy/xhr-upload'
import { DashboardPluginOptions } from './Dashboard/plugin'

export interface ImperativeUploadOptions {
  blockId?: DashboardPluginOptions['blockId']
  onUploaded?: DashboardPluginOptions['onUploaded']
  onFileLoaded?: DashboardPluginOptions['onFileLoaded']
  onProgress?: DashboardPluginOptions['onProgress']
  prepareFileUpload?: DashboardPluginOptions['prepareFileUpload']
  fileType: DashboardPluginOptions['fileType']
}

export const imperativeUpload = async (
  file: File,
  { prepareFileUpload, blockId, fileType, onFileLoaded, onUploaded, onProgress }: ImperativeUploadOptions
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

  const handleUploadProgress = (file: UppyFile, progress: FileProgress): void => {
    onProgress!({
      name: file.name,
      bytesTotal: progress.bytesTotal,
      bytesUploaded: progress.bytesUploaded,
      percentage: progress.percentage
    })
  }

  const handleUploadSuccess = (file: UppyFile): void => {
    onUploaded!({
      action: 'add',
      url: uploadMeta.blobKey,
      signedId: uploadMeta.signedId,
      viewUrl: uploadMeta.viewUrl,
      downloadUrl: uploadMeta.downloadUrl,
      meta: {
        name: file.name,
        size: file.size,
        source: 'origin',
        contentType: file.type
      }
    })
    uppy.off('upload-success', handleUploadSuccess)
    uppy.off('upload-progress', handleUploadProgress)
    uppy.close()
  }

  uppy.on('upload-progress', handleUploadProgress)
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

  const { endpoint, headers, blobKey, viewUrl, signedId, downloadUrl } = await prepareFileUpload!(
    blockId!,
    fileType,
    file
  )

  const uploadMeta = {
    blobKey,
    viewUrl,
    signedId,
    downloadUrl
  }
  uppy.getPlugin('XHRUpload')!.setOptions({
    endpoint,
    headers
  })

  onFileLoaded?.(file)

  await uppy.upload()
}
