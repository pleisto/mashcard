import { Space, Avatar } from '../../../components'
import { User, Apple } from '../../../components/icon'

const Active = () => (
  <Space>
    <Avatar.Group>
      <Avatar src="https://avatars.githubusercontent.com/u/41993484?s=120&v=4" />
      <Avatar style={{ backgroundColor: '#87d068' }} icon={<User />} />
      <Avatar style={{ backgroundColor: '#f56a00' }}>B</Avatar>
      <Avatar style={{ backgroundColor: '#1890ff' }} icon={<Apple />} />
    </Avatar.Group>
  </Space>
)

export default Active
