import { Button, Empty } from '../../../components'

const Base = () => (
  <>
    <Empty />
    <br />
    <hr />
    <br />
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    <br />
    <hr />
    <br />
    <Empty
      image="https://s3.brickapis.com/design-system/empty.svg"
      imageStyle={{
        height: 60
      }}
      description={
        <span>
          Customize <a href="#">Description</a>
        </span>
      }
    >
      <Button type="primary">Create Now</Button>
    </Empty>
    <br />
    <hr />
    <br />
    <Empty description={false} />
  </>
)
export default Base
