/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { format } from 'date-fns'
import { CellProps } from 'react-table'
import { useEditingStatus } from '../useEditingStatus'
import { DatePicker } from './DatePicker'
import './DateCell.css'
import { DatabaseColumns } from '../../useColumns'

export interface DateCellProps extends CellProps<object> {}

export const DateCell: React.FC<DateCellProps> = props => {
  const { value, updateData, cell, setColumns } = props
  const [editing, { show: showEditing, hide: hideEditing }] = useEditingStatus(props)
  const currentValue = React.useRef<Date | null>(value)
  React.useEffect(() => (currentValue.current = value), [value])

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation()
  }

  const setIncludeTime = (includeTime: boolean): void => {
    setColumns((prevColumns: DatabaseColumns) =>
      prevColumns.map(dbColumn =>
        dbColumn.key === cell.column.id
          ? {
              ...dbColumn,
              dateIncludeTime: includeTime
            }
          : dbColumn
      )
    )
  }

  const handleChange = (value: Date | null): void => {
    currentValue.current = value
  }

  const handleConfirmChange = (): void => {
    hideEditing()
    // TODO: fix type
    updateData((cell.row.original as any).id, cell.column.id, currentValue.current)
  }

  const includeTime = cell.column.dateIncludeTime
  const defaultFormat = `yyyy/MM/dd${includeTime ? ' HH:mm:ss' : ''}`

  return (
    <div role="button" tabIndex={-1} className="table-block-date-cell" onClick={showEditing}>
      {!editing && value && format(new Date(value), cell.column.dateFormat ?? defaultFormat)}
      {editing && (
        <>
          <div data-testid="table-date-overlay" className="table-block-cell-overlay" onClick={handleOverlayClick} />
          <div onClick={handleOverlayClick}>
            <DatePicker
              value={currentValue.current}
              onChange={handleChange}
              onConfirmChange={handleConfirmChange}
              includeTime={includeTime}
              setIncludeTime={setIncludeTime}
            />
          </div>
        </>
      )}
    </div>
  )
}
