import { Space, Avatar } from '../../../components'
import { User } from '../../../components/icon'

const Base = () => (
  <Space>
    <Avatar size={64} icon={<User />} />
    <Avatar size="large" icon={<User />} />
    <Avatar icon={<User />} />
    <Avatar initials="Albert Einstein" />
    <Avatar size="small" icon={<User />} />
    <Avatar shape="square" size="large" icon={<User />} />
    <Avatar shape="square" icon={<User />} />
    <Avatar shape="square" size="small" icon={<User />} />
  </Space>
)
export default Base
