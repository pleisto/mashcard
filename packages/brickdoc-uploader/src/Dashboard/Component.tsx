import * as React from 'react'
import { Uppy } from '@uppy/core'
import XhrUploadPlugin from '@uppy/xhr-upload'
import { DashboardPlugin, DashboardPluginOptions } from './plugin'

export type {
  UploadResultData,
  ImportSourceOption,
  DashboardPluginOptions,
  UploadProgress,
  UnsplashImage,
  EmojiMeta
} from './plugin'

export interface DashboardProps {
  blockId?: DashboardPluginOptions['blockId']
  onProgress?: DashboardPluginOptions['onProgress']
  onUploaded?: DashboardPluginOptions['onUploaded']
  onFileLoaded?: DashboardPluginOptions['onFileLoaded']
  prepareFileUpload?: DashboardPluginOptions['prepareFileUpload']
  fetchUnsplashImages?: DashboardPluginOptions['fetchUnsplashImages']
  fileType?: DashboardPluginOptions['fileType']
  importSources: DashboardPluginOptions['importSources']
  canbeRemove?: DashboardPluginOptions['canbeRemove']
}

export const Dashboard: React.FC<DashboardProps> = ({
  blockId,
  onUploaded,
  prepareFileUpload,
  fetchUnsplashImages,
  importSources,
  fileType,
  onFileLoaded,
  onProgress,
  canbeRemove = false
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

        container.current = ele ?? undefined
        uppy.current = new Uppy()
        // TODO: use active storage instead
        uppy.current.use(XhrUploadPlugin, {
          endpoint: '/',
          method: 'PUT',
          formData: false,
          getResponseData: () => ({
            url: ''
          })
        })
        uppy.current.use(DashboardPlugin, {
          target: container.current!,
          blockId,
          onProgress,
          onUploaded,
          onFileLoaded,
          prepareFileUpload,
          fetchUnsplashImages,
          importSources,
          fileType: fileType!,
          canbeRemove
        })
      }}
    />
  )
}
