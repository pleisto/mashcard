import React from 'react'
import { Dayjs } from 'dayjs'

export type DateRangeValue = [Dayjs | null, Dayjs | null]

export interface DatePickerProps {
  includeTime: boolean
  setIncludeTime: (includeTime: boolean) => void
  value: DateRangeValue | null
  onChange: (values: DateRangeValue | null, formatString: [string, string]) => void
  onConfirmChange: VoidFunction
}

export const DateRangePicker: React.FC<DatePickerProps> = ({ value, onConfirmChange, setIncludeTime }) => {
  return null
  /* return (
   *   <BrkDatePicker.RangePicker
   *     className="table-date-range-cell-picker"
   *     showTime={includeTime}
   *     open={true}
   *     value={dateRangeValue}
   *     onChange={onChange}
   *     onOpenChange={handleVisibleChange}
   *     renderExtraFooter={() => (
   *       <Checkbox checked={includeTime} onChange={handleIncludeTimeChange}>
   *         Include time
   *       </Checkbox>
   *     )}
   *   />
   * ) */
}
