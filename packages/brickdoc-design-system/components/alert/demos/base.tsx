import { Alert, Space } from '../../../components'

const Base = () => (
  <>
    <Space size={24}>
      <Alert
        message="42 is the answer to the ultimate question of life the universe and everything."
        onClose={() => {}}
        showIcon
        type="info"
      />
    </Space>
    <br />
    <Space size={24}>
      <Alert message="Success Text" type="success" />
    </Space>
  </>
)
export default Base
