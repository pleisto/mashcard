import { DatePicker, Space } from '../../../components'
import 'dayjs'
const Base = () => (
  <Space>
    <DatePicker placeholder="placeholder" />
    <br />
    <br />
    <DatePicker picker="week" placeholder="placeholder" />
    <br />
    <br />
    <DatePicker picker="month" bordered={false} placeholder="placeholder" />
    <br />
    <br />
    <DatePicker picker="quarter" size="large" placeholder="placeholder" />
  </Space>
)
export default Base
