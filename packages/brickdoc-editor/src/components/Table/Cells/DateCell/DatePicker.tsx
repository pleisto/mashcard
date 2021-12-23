import React from 'react'
import { Checkbox, DatePicker as BrkDatePicker, DatePickerProps as BrkDatePickerProps } from '@brickdoc/design-system'
import { CheckboxChangeEvent } from '@brickdoc/design-system/components/checkbox'

export interface DatePickerProps {
  includeTime: boolean
  setIncludeTime: (includeTime: boolean) => void
  value: BrkDatePickerProps['value']
  onChange: BrkDatePickerProps['onChange']
  onConfirmChange: VoidFunction
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  onConfirmChange,
  includeTime,
  setIncludeTime
}) => {
  const handleIncludeTimeChange = (event: CheckboxChangeEvent): void => {
    setIncludeTime(event.target.checked)
  }

  const handleVisibleChange = (visible: boolean): void => {
    if (visible) return
    onConfirmChange()
  }

  return (
    <BrkDatePicker
      className="table-date-cell-picker"
      showTime={includeTime}
      open={true}
      value={value}
      onChange={onChange}
      onOpenChange={handleVisibleChange}
      renderExtraFooter={() => (
        <Checkbox checked={includeTime} onChange={handleIncludeTimeChange}>
          Include time
        </Checkbox>
      )}
    />
  )
}
