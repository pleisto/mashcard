import * as React from 'react'
import { Uppy } from '@uppy/core'
import { DashboardPlugin, UploadResultData } from './plugin'

export type { UploadResultData }

export interface DashboardProps {
  onUploaded?: (data: UploadResultData) => void
}

export const Dashboard: React.FC<DashboardProps> = ({ onUploaded }) => {
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
        uppy.current = new Uppy()
        uppy.current.use(DashboardPlugin, { target: container.current, onUploaded })
      }}
    />
  )
}
