import React from 'react'

export interface SyncStatusValue {
  committing: boolean
  setCommitting: (committing: boolean) => void
}

export const SyncStatusContext = React.createContext<SyncStatusValue>({
  committing: false,
  setCommitting: () => {}
})

export const useSyncStatusContextValue = (): SyncStatusValue => {
  const [committing, setCommitting] = React.useState<boolean>(false)
  return React.useMemo(
    () => ({
      committing,
      setCommitting
    }),
    [committing]
  )
}
