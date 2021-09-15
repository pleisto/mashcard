/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { format } from 'date-fns'
import { CellProps } from 'react-table'
import { useEditingStatus } from '../useEditingStatus'
import { DateRangePicker, DateRangeValue } from './DateRangePicker'
import './DateRangeCell.css'
import { DatabaseColumns } from '../../useColumns'

export interface DateRangeCellProps extends CellProps<object> {}

export const DateRangeCell: React.FC<DateRangeCellProps> = props => {
  const { value, updateData, cell, setColumns } = props
  const [editing, { show: showEditing, hide: hideEditing }] = useEditingStatus(props)
  const currentValue = React.useRef<DateRangeValue | null>(value)
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

  const handleChange = (value: DateRangeValue | null): void => {
    currentValue.current = value
  }

  const handleConfirmChange = (): void => {
    hideEditing()
    // TODO: fix type
    updateData((cell.row.original as any).id, cell.column.id, currentValue.current)
  }

  const includeTime = cell.column.dateIncludeTime
  const defaultFormat = `yyyy/MM/dd${includeTime ? ' HH:mm:ss' : ''}`
  const startDate = value?.[0]
  const endDate = value?.[1]

  return (
    <div role="button" tabIndex={-1} className="table-block-date-range-cell" onClick={showEditing}>
      {!editing && startDate && format(new Date(startDate), cell.column.dateFormat ?? defaultFormat)}
      {startDate && ' - '}
      {!editing && endDate && format(new Date(endDate), cell.column.dateFormat ?? defaultFormat)}
      {editing && (
        <>
          <div data-testid="table-date-range-overlay" className="table-block-cell-overlay" onClick={handleOverlayClick} />
          <div onClick={handleOverlayClick}>
            <DateRangePicker
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
