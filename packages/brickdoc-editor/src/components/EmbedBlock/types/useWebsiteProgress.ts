/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { UploadProgress } from '@brickdoc/uploader'
import React from 'react'

export function useWebsiteMetaProgress(): [UploadProgress, (uploaded?: number) => void, VoidFunction] {
  const [progress, setProgress] = React.useState<UploadProgress>({
    name: '',
    bytesTotal: 100,
    bytesUploaded: 0,
    percentage: 0
  })

  const resetProgress = React.useCallback((uploaded?: number) => {
    if (fakeProgressInterval.current) {
      clearInterval(fakeProgressInterval.current)
    }
    setProgress(progress => ({
      ...progress,
      bytesUploaded: uploaded ?? 0,
      percentage: 0
    }))
  }, [])
  const fakeProgressInterval = React.useRef<NodeJS.Timer>()

  const progressing = React.useCallback(() => {
    fakeProgressInterval.current = setInterval(() => {
      setProgress(progress => ({
        ...progress,
        bytesUploaded: progress.bytesTotal + 10,
        percentage: (progress.bytesTotal + 10) / progress.bytesUploaded
      }))
    }, 300)
  }, [])

  return [progress, resetProgress, progressing]
}
