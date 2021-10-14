import { Space, Progress } from '../../../components'

const Base = () => (
  <>
    <Progress percent={30} />
    <Progress percent={50} status="active" />
    <Progress percent={70} status="exception" />
    <Progress percent={100} />
    <Progress percent={50} showInfo={false} />
    <br />
    <br />
    <br />
    <Space size="large">
      <Progress type="circle" percent={75} />
      <Progress type="circle" percent={70} status="exception" />
      <Progress type="dashboard" percent={75} />
    </Space>
  </>
)
export default Base
