import React from 'react'
import { CellProps as ReactTableCellProps } from 'react-table'

export function useEditingStatus({
  cell,
  resetActiveStatus,
  updateActiveStatus
}: ReactTableCellProps<object>): [boolean, { show: () => void; hide: () => void }] {
  const [editing, setEditing] = React.useState(false)
  const show = (): void => {
    resetActiveStatus()
    setEditing(true)
  }

  const hide = (): void => {
    // TODO: fix type
    updateActiveStatus([{ rowId: (cell.row.original as any).id, columnIndex: cell.column.index }])
    setEditing(false)
  }

  return [editing, { show, hide }]
}
