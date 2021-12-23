/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { CellProps } from 'react-table'
import { useEditingStatus } from '../useEditingStatus'
import { DatePicker } from './DatePicker'
import './DateCell.css'
import { DatabaseColumns } from '../../useColumns'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'

export interface DateCellProps extends CellProps<object> {}

export const DateCell: React.FC<DateCellProps> = props => {
  const { value, updateData, cell, setColumns } = props
  const [editing, { show: showEditing, hide: hideEditing }] = useEditingStatus(props)
  const currentValue = React.useRef<Dayjs | null>(value)
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

  const handleChange = (value: Dayjs | null): void => {
    currentValue.current = value
  }

  const handleConfirmChange = (): void => {
    hideEditing()
    // TODO: fix type
    updateData((cell.row.original as any).id, cell.column.id, currentValue.current)
  }

  const includeTime = cell.column.dateIncludeTime
  const defaultFormat = `YYYY/MM/DD${includeTime ? ' HH:mm:ss' : ''}`

  return (
    <div
      data-testid={TEST_ID_ENUM.editor.tableBlock.cell.date.id}
      role="button"
      tabIndex={-1}
      className="table-block-date-cell"
      onClick={showEditing}
    >
      {!editing && value && dayjs(value).format(cell.column.dateFormat ?? defaultFormat)}
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
