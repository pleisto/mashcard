import { Space, Tooltip, Button } from '../../../components'

const Base = () => (
  <Space>
    <Tooltip title="prompt text">
      <span>Tooltip will show on mouse enter.</span>
    </Tooltip>
    <Tooltip placement="right" title="Placement Right">
      <Button>Right</Button>
    </Tooltip>
    <Tooltip title="prompt text" color="#f50">
      <Button>Color</Button>
    </Tooltip>
  </Space>
)
export default Base
