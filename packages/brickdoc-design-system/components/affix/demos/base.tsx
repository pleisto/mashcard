import { Affix, Space } from '../../../components'

const Base = () => (
  <Space>
    <Affix
      offsetBottom={0}
      offsetTop={0}
      onChange={() => {}}
      target={() => {
        return null
      }}
    >
      <span>Affix</span>
    </Affix>
  </Space>
)
export default Base
