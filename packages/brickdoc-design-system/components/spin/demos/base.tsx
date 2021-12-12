import { Spin, Space } from '../../../components'
import { Rotation as LoadingOutlined } from '../../icon'

const Base = () => (
  <>
    <Space size="middle">
      <Spin size="small" />
      <Spin />
      <Spin size="large" />
    </Space>
    <br />
    <br />
    <Spin tip="Loading...">
      <h1>22</h1>
    </Spin>
    <br />
    <br />
    <Spin indicator={<LoadingOutlined spin size={24} />} />
  </>
)
export default Base
