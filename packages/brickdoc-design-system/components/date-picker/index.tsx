import { Moment } from 'moment'
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns'
import generatePicker, {
  PickerProps,
  PickerDateProps,
  RangePickerProps as BaseRangePickerProps,
} from './generatePicker'

export type DatePickerProps = PickerProps<Moment>;
export type MonthPickerProps = Omit<PickerDateProps<Moment>, 'picker'>;
export type WeekPickerProps = Omit<PickerDateProps<Moment>, 'picker'>;
export type RangePickerProps = BaseRangePickerProps<Moment>;

const DatePicker = generatePicker<Date>(dateFnsGenerateConfig)

export default DatePicker
