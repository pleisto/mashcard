import { Card } from '../../../components'

const Base = () => (
  <Card title="Card title">
    <Card extra={<a href="#">More</a>} title="Inner Card title" type="inner">
      Inner Card content
    </Card>
    <Card
      extra={<a href="#">More</a>}
      style={{
        marginTop: 16
      }}
      title="Inner Card title"
      type="inner"
    >
      Inner Card content
    </Card>
  </Card>
)
export default Base
