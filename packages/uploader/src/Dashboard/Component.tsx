import { FC, useEffect, useRef } from 'react'
import { Uppy } from '@uppy/core'
import XhrUploadPlugin from '@uppy/xhr-upload'
import ThumbnailGenerator from '@uppy/thumbnail-generator'

import { DashboardPlugin, DashboardPluginName, DashboardPluginOptions } from './plugin'

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
  showRemoveButton?: DashboardPluginOptions['showRemoveButton']
}

export const Dashboard: FC<DashboardProps> = ({
  blockId,
  onUploaded,
  prepareFileUpload,
  fetchUnsplashImages,
  importSources,
  fileType,
  onFileLoaded,
  onProgress,
  showRemoveButton = false
}) => {
  const container = useRef<HTMLElement>()
  const uppy = useRef<Uppy>()

  useEffect(() => {
    const options = {
      target: container.current!,
      blockId,
      onProgress,
      onUploaded,
      onFileLoaded,
      prepareFileUpload,
      fetchUnsplashImages,
      importSources,
      fileType: fileType!,
      showRemoveButton
    }

    if (!uppy.current) {
      uppy.current = new Uppy()
      // TODO: use active storage instead
      uppy.current.use(ThumbnailGenerator, {
        thumbnailWidth: 200,
        waitForThumbnailsBeforeUpload: true
      })
      uppy.current.use(XhrUploadPlugin, {
        endpoint: '/',
        method: 'PUT',
        formData: false,
        getResponseData: () => ({
          url: ''
        })
      })
      uppy.current.use(DashboardPlugin, options)
    } else {
      uppy.current.getPlugin(DashboardPluginName)?.setOptions(options)
    }
  }, [
    blockId,
    showRemoveButton,
    fetchUnsplashImages,
    fileType,
    importSources,
    onFileLoaded,
    onProgress,
    onUploaded,
    prepareFileUpload
  ])

  return (
    <div
      ref={ele => {
        if (container.current) {
          return
        }

        container.current = ele ?? undefined
      }}
    />
  )
}
