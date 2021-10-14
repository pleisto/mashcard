import { Card, Avatar } from '../../../components'
import { SettingConfig, Add, Edit } from '../../icon'
const { Meta } = Card

const Active = () => (
  <Card
    style={{ width: 300 }}
    cover={<img alt="example" src="https://placeimg.com/600/450/nature/grayscale" />}
    actions={[<Add key="add" />, <SettingConfig key="setting" />, <Edit key="edit" />]}
  >
    <Meta avatar={<Avatar>BD</Avatar>} title="Card title" description="This is the description" />
  </Card>
)

export default Active
