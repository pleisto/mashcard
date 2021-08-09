import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns'

import './style'
import generateCalendar, { CalendarProps } from './generateCalendar'

const Calendar = generateCalendar<Date>(dateFnsGenerateConfig)

export type { CalendarProps }
export default Calendar
