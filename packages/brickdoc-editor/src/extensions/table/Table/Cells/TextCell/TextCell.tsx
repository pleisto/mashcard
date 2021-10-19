/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { CellProps } from 'react-table'
import { Input } from '@brickdoc/design-system'
import { useEditingStatus } from '../useEditingStatus'
import './TextCell.css'

export interface TextCellProps extends CellProps<object> {}

export const TextCell: React.FC<TextCellProps> = props => {
  const { value, updateData, cell } = props
  const [editing, { show: showEditing, hide: hideEditing }] = useEditingStatus(props)

  const [currentValue, setCurrentValue] = React.useState(value)
  React.useEffect(() => setCurrentValue(value), [value])

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setCurrentValue(event.target.value)
  }

  const handleEndEditing = (): void => {
    // TODO: fix type
    updateData((cell.row.original as any).id, cell.column.id, currentValue)
    hideEditing()
  }

  if (editing) {
    return (
      <>
        <Input.TextArea
          className="table-block-text-input"
          /* eslint-disable-next-line jsx-a11y/no-autofocus */
          autoFocus={true}
          value={currentValue}
          autoSize={true}
          onChange={handleChange}
          onPressEnter={handleEndEditing}
          data-testid="table-text-cell-input"
        />
        <div data-testid="table-text-overlay" className="table-block-cell-overlay" onClick={handleEndEditing} />
      </>
    )
  }

  return (
    <div role="button" tabIndex={-1} className="table-block-text-cell" onClick={showEditing}>
      {value}
    </div>
  )
}
