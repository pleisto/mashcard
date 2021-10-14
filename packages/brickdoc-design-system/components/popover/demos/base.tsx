import { Popover, Space, Button } from '../../../components'

const Base = () => (
  <Space>
    <Popover
      content={
        <div>
          <p>Content</p>
          <p>Content</p>
        </div>
      }
      title="Hello World"
    >
      <Button type="primary">Hover me</Button>
    </Popover>
  </Space>
)
export default Base
