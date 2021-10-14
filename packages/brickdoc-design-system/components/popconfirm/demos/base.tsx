import { Space, Popconfirm } from '../../../components'

const Base = () => (
  <Space>
    <Popconfirm title="Are you sure to delete this task?" okText="Yes" cancelText="No">
      <a href="#">Delete</a>
    </Popconfirm>
  </Space>
)
export default Base
