import React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { Checkbox, DatePicker as BrkDatePicker } from '@brickdoc/design-system'
import { CheckboxChangeEvent } from '@brickdoc/design-system/components/checkbox'

export type DateRangeValue = [Dayjs | null, Dayjs | null]

export interface DatePickerProps {
  includeTime: boolean
  setIncludeTime: (includeTime: boolean) => void
  value: DateRangeValue | null
  onChange: (values: DateRangeValue | null, formatString: [string, string]) => void
  onConfirmChange: VoidFunction
}

export const DateRangePicker: React.FC<DatePickerProps> = ({
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

  const dateRangeValue = value?.map(i => dayjs(i)) as DateRangeValue

  return (
    <BrkDatePicker.RangePicker
      className="table-date-range-cell-picker"
      showTime={includeTime}
      open={true}
      value={dateRangeValue}
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
