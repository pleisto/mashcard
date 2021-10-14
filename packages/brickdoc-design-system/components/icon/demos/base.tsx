import { Space } from '../../../components'
import { Apple, Notes, Rotation } from '../../icon'

const Base = () => (
  <Space size="large" style={{ fontSize: '30px' }}>
    <Apple />
    <Notes />
    <Rotation spin={true} />
  </Space>
)
export default Base
