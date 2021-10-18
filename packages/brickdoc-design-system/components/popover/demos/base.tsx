import { Popover, Space, Button } from '../../../components'

const Base = () => (
  <Space>
    <Popover
      trigger="click"
      content={
        <div>
          <p>Content</p>
          <p>Content</p>
        </div>
      }
      title="Hello World"
    >
      <Button type="primary">Click me</Button>
    </Popover>
  </Space>
)
export default Base
