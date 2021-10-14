import { Space, Pagination } from '../../../components'

function showTotal(total) {
  return `Total ${total} items`
}
const Base = () => (
  <Space size="large" direction="vertical">
    <Pagination defaultCurrent={6} total={500} showQuickJumper />
    <Pagination size="small" total={50} disabled showTotal={showTotal} showSizeChanger showQuickJumper />
  </Space>
)

export default Base
