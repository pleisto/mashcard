import { Spin, Space, Alert } from '../../../components'
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
      <Alert message="Alert message title" description="Further details about the context of this alert." type="info" />
    </Spin>
    <br />
    <br />
    <Spin indicator={<LoadingOutlined spin size={24} />} />
  </>
)
export default Base
