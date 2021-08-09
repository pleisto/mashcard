import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns'

import './style'
import generatePicker, { PickerProps, PickerDateProps, RangePickerProps as BaseRangePickerProps } from './generatePicker'

export type DatePickerProps = PickerProps<Date>
export type MonthPickerProps = Omit<PickerDateProps<Date>, 'picker'>
export type WeekPickerProps = Omit<PickerDateProps<Date>, 'picker'>
export type RangePickerProps = BaseRangePickerProps<Date>

const DatePicker = generatePicker<Date>(dateFnsGenerateConfig)

export default DatePicker
