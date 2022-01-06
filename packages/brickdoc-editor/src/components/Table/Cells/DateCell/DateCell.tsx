/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { CellProps } from 'react-table'
import { useEditingStatus } from '../useEditingStatus'
import './DateCell.css'
import { TEST_ID_ENUM } from '@brickdoc/test-helper'

export interface DateCellProps extends CellProps<object> {}

export const DateCell: React.FC<DateCellProps> = props => {
  const { value, cell } = props
  const [editing, { show: showEditing }] = useEditingStatus(props)
  const currentValue = React.useRef<Dayjs | null>(value)
  React.useEffect(() => (currentValue.current = value), [value])

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation()
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
            {/* <DatePicker
              value={currentValue.current}
              onChange={handleChange}
              onConfirmChange={handleConfirmChange}
              includeTime={includeTime}
              setIncludeTime={setIncludeTime}
            /> */}
          </div>
        </>
      )}
    </div>
  )
}
