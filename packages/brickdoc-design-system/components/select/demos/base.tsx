import { Select, Tag } from '../../../components'

const { Option } = Select

function tagRender(props) {
  const { label, value, closable, onClose } = props
  const onPreventMouseDown = event => {
    event.preventDefault()
    event.stopPropagation()
  }
  return (
    <Tag color={value} onMouseDown={onPreventMouseDown} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
      {label}
    </Tag>
  )
}

const Base = () => (
  <>
    <Select defaultValue="ruby" style={{ width: 120 }}>
      <Option value="ruby">Ruby</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="jack">Jack</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
    </Select>
    <br />
    <br />
    <Select mode="multiple" style={{ width: '100%' }} placeholder="select one country" defaultValue={['china']} optionLabelProp="label">
      <Option value="china" label="China">
        <div className="demo-option-label-item">
          <span role="img" aria-label="China">
            🇨🇳
          </span>
          China (中国)
        </div>
      </Option>
      <Option value="usa" label="USA">
        <div className="demo-option-label-item">
          <span role="img" aria-label="USA">
            🇺🇸
          </span>
          USA (美国)
        </div>
      </Option>
      <Option value="japan" label="Japan">
        <div className="demo-option-label-item">
          <span role="img" aria-label="Japan">
            🇯🇵
          </span>
          Japan (日本)
        </div>
      </Option>
      <Option value="korea" label="Korea">
        <div className="demo-option-label-item">
          <span role="img" aria-label="Korea">
            🇰🇷
          </span>
          Korea (韩国)
        </div>
      </Option>
    </Select>
    <br />
    <br />
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Select a person"
      optionFilterProp="children"
      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    >
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="tom">Tom</Option>
    </Select>
    <br />
    <br />
    <Select
      mode="multiple"
      showArrow
      tagRender={tagRender}
      defaultValue={['gold', 'cyan']}
      style={{ width: '100%' }}
      options={[{ value: 'gold' }, { value: 'lime' }, { value: 'green' }, { value: 'cyan' }]}
    />
  </>
)
export default Base
