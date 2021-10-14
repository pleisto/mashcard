import { AutoComplete, Input } from '../../../components'
const noop = () => {}

const Base = () => (
  <AutoComplete
    defaultActiveFirstOption
    dropdownMatchSelectWidth
    notFoundContent="Not Found"
    onBlur={noop}
    onChange={noop}
    onDropdownVisibleChange={noop}
    onFocus={noop}
    onSearch={noop}
    onSelect={noop}
    options={[
      {
        label: 'pods',
        value: 'pods'
      },
      {
        label: 'accounts',
        value: 'accounts'
      },
      {
        label: 'demo',
        value: 'demo'
      }
    ]}
    placeholder="Brickdoc Search Engine"
  >
    <Input />
  </AutoComplete>
)
export default Base
