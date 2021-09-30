import { Uppy, UppyFile } from '@uppy/core'
import React from 'react'
import { ImportSourceOption } from './Dashboard'
import { DashboardPluginOptions } from './plugin'

interface UploadPanelProps {
  pluginOptions: DashboardPluginOptions
  importSource: ImportSourceOption
  uppy: Uppy
  pluginId: string
}

export const UploadPanel: React.FC<UploadPanelProps> = ({ importSource, uppy, pluginId, pluginOptions }) => {
  React.useEffect(() => {
    const handleUploadSuccess = (file: UppyFile): void => {
      pluginOptions.onUploaded({
        action: 'add',
        url: uploadMeta.current.blobKey,
        signedId: uploadMeta.current.signedId,
        viewUrl: uploadMeta.current.viewUrl,
        meta: {
          name: file.name,
          size: file.size,
          source: 'origin'
        }
      })
    }

    uppy.on('upload-success', handleUploadSuccess)

    return () => {
      uppy.off('upload-success', handleUploadSuccess)
    }
  }, [uppy, pluginOptions])

  const input = React.useRef<HTMLInputElement>()
  const uploadMeta = React.useRef<{ blobKey: string; viewUrl: string; signedId: string }>()
  const addFile = (file: File): void => {
    const descriptor = {
      source: pluginId,
      name: file.name,
      type: file.type,
      data: file
    }

    try {
      uppy.addFile(descriptor)
    } catch (err) {
      uppy.log(err as string)
    }
  }

  // TODO: handle error
  const handleUpload = async (file: File): Promise<void> => {
    const { endpoint, headers, blobKey, viewUrl, signedId } = await pluginOptions.prepareFileUpload(
      pluginOptions.blockId,
      pluginOptions.fileType,
      file
    )
    uploadMeta.current = {
      blobKey,
      viewUrl,
      signedId
    }
    uppy.getPlugin('XHRUpload').setOptions({
      endpoint,
      headers
    })

    pluginOptions.onFileLoaded?.(file)

    await uppy.upload()
  }

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files[0]
    // We clear the input after a file is selected, because otherwise
    // change event is not fired in Chrome and Safari when a file
    // with the same name is selected.
    event.target.value = null

    addFile(file)
    await handleUpload(file)
  }

  const handleChooseFile = (): void => {
    input.current?.click()
  }

  return (
    <div role="tabpanel" className="uploader-dashboard-upload-panel">
      <input
        className="dashboard-upload-file-input"
        ref={input}
        type="file"
        multiple={false}
        accept={importSource.acceptType}
        onChange={handleInputChange}
      />
      <button onClick={handleChooseFile} className="dashboard-panel-button">
        {importSource.buttonText}
      </button>
      <div className="dashboard-panel-hint">{importSource.buttonHint}</div>
    </div>
  )
}
