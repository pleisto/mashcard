import { TimePicker } from '../../../components'

const Base = () => (
  <>
    <TimePicker />
    <br />
    <br />
    <TimePicker use12Hours format="h:mm a" />
    <br />
    <br />
    <TimePicker.RangePicker />
  </>
)
export default Base
