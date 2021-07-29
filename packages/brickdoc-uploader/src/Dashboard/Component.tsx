import * as React from 'react'
import { Uppy } from '@uppy/core'
import XhrUploadPlugin from '@uppy/xhr-upload'
import { DashboardPlugin, DashboardPluginOptions, UploadResultData, ImportSourceOption, UploadProgress } from './plugin'

export type { UploadResultData, ImportSourceOption, DashboardPluginOptions, UploadProgress }

export interface DashboardProps {
  onProgress?: DashboardPluginOptions['onProgress']
  onUploaded?: DashboardPluginOptions['onUploaded']
  onFileLoaded?: DashboardPluginOptions['onFileLoaded']
  prepareFileUpload: DashboardPluginOptions['prepareFileUpload']
  fileType: DashboardPluginOptions['fileType']
  importSources: DashboardPluginOptions['importSources']
}

export const Dashboard: React.FC<DashboardProps> = ({
  onUploaded,
  prepareFileUpload,
  importSources,
  fileType,
  onFileLoaded,
  onProgress
}) => {
  const container = React.useRef<HTMLElement>()
  const uppy = React.useRef<Uppy>()

  if (!uppy) {
    return null
  }

  return (
    <div
      ref={ele => {
        if (container.current) {
          return
        }

        container.current = ele
        uppy.current = new Uppy({ debug: true })
        // TODO: use active storage instead
        uppy.current.use(XhrUploadPlugin, {
          method: 'PUT',
          formData: false,
          getResponseData: () => ({
            url: ''
          })
        })
        uppy.current.use(DashboardPlugin, {
          target: container.current,
          onProgress,
          onUploaded,
          onFileLoaded,
          prepareFileUpload,
          importSources,
          fileType
        })
      }}
    />
  )
}
