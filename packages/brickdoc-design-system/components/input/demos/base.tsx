import { Select, Input } from '../../../components'
import { User } from '../../icon'

const { Option } = Select
const { Search, TextArea } = Input

const selectBefore = (
  <Select defaultValue="http://" className="select-before">
    <Option value="http://">http://</Option>
    <Option value="https://">https://</Option>
  </Select>
)
const selectAfter = (
  <Select defaultValue=".com" className="select-after">
    <Option value=".com">.com</Option>
    <Option value=".jp">.jp</Option>
    <Option value=".cn">.cn</Option>
    <Option value=".org">.org</Option>
  </Select>
)

const Base = () => (
  <>
    <Input placeholder="Basic usage" />
    <br />
    <br />
    <Input size="large" placeholder="large size" prefix={<User />} />
    <br />
    <br />
    <Input addonBefore={selectBefore} addonAfter={selectAfter} defaultValue="mysite" />
    <br />
    <br />
    <Search placeholder="input search text" style={{ width: 200 }} />
    <br />
    <br />
    <TextArea rows={4} />
    <br />
    <br />
    <Input.Password placeholder="input password" />
    <br />
    <br />
    <Input prefix="￥" suffix="RMB" disabled />
    <br />
    <br />
    <Search placeholder="input search text" enterButton="Search" size="small" loading />
    <br />
    <br />
    <Input.Group compact>
      <Select defaultValue="Zhejiang">
        <Option value="Zhejiang">Zhejiang</Option>
        <Option value="Jiangsu">Jiangsu</Option>
      </Select>
      <Input style={{ width: '50%' }} defaultValue="HKE Museum of Art, Ningbo" />
    </Input.Group>
    <br />
    <br />
    <Input placeholder="input with clear icon" allowClear />
  </>
)
export default Base
