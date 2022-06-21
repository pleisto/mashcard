import { useCallback, useRef, useState } from 'react'
import { UploadProgress } from '@mashcard/uploader'

export function useWebsiteMetaProgress(): [UploadProgress, (uploaded?: number) => void, VoidFunction] {
  const [progress, setProgress] = useState<UploadProgress>({
    name: '',
    bytesTotal: 100,
    bytesUploaded: 0,
    percentage: 0
  })

  const resetProgress = useCallback((uploaded?: number) => {
    if (fakeProgressInterval.current) {
      clearInterval(fakeProgressInterval.current)
    }
    setProgress(progress => ({
      ...progress,
      bytesUploaded: uploaded ?? 0,
      percentage: (uploaded ?? 0) / progress.bytesTotal
    }))
  }, [])
  const fakeProgressInterval = useRef<NodeJS.Timer>()

  const progressing = useCallback(() => {
    fakeProgressInterval.current = setInterval(() => {
      setProgress(progress => ({
        ...progress,
        bytesUploaded: progress.bytesUploaded + 10,
        percentage: (progress.bytesUploaded + 10) / progress.bytesTotal
      }))
    }, 300)
  }, [])

  return [progress, resetProgress, progressing]
}
