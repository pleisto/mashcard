import * as React from 'react'
import { Uppy } from '@uppy/core'
import XhrUploadPlugin from '@uppy/xhr-upload'
import { DashboardPlugin, DashboardPluginOptions, UploadResultData } from './plugin'

export type { UploadResultData }

export interface DashboardProps {
  onUploaded?: DashboardPluginOptions['onUploaded']
  prepareFileUpload: DashboardPluginOptions['prepareFileUpload']
}

export const Dashboard: React.FC<DashboardProps> = ({ onUploaded, prepareFileUpload }) => {
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
          getResponseData: responseText => {
            console.log(responseText)
            return {
              url: ''
            }
          }
        })
        uppy.current.use(DashboardPlugin, { target: container.current, onUploaded, prepareFileUpload })
      }}
    />
  )
}
