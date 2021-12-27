import React from 'react'
import { TableActiveStatus } from 'react-table'

export type IsCellActive = (rowId: string, cellIndex: number) => boolean
export type ActiveStatusUpdater = React.Dispatch<React.SetStateAction<TableActiveStatus[]>>

export interface UseActiveStatusUtils {
  isRowActive: (rowId: string) => boolean
  isCellActive: IsCellActive
  update: ActiveStatusUpdater
  reset: () => void
}

export function useActiveStatus(): [UseActiveStatusUtils] {
  const [activeItems, setActiveStatus] = React.useState<TableActiveStatus[]>([])
  const isRowActive = React.useCallback(
    (rowId: string): boolean => activeItems.some(item => item.rowId === rowId && item.columnIndex === undefined),
    [activeItems]
  )
  const isCellActive = React.useCallback(
    (rowId: string, columnIndex: number): boolean =>
      activeItems.some(item => {
        return item.rowId === rowId && item.columnIndex === columnIndex
      }),
    [activeItems]
  )

  return React.useMemo(
    () => [{ isRowActive, isCellActive, update: setActiveStatus, reset: () => setActiveStatus([]) }],
    [isCellActive, isRowActive]
  )
}
