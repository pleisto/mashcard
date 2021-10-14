import { Space, Cascader } from '../../../components'

const options = [
  {
    value: 'os',
    label: 'Operating System',
    children: [
      { value: 'linux', label: 'Linux' },
      { value: 'bsd', label: 'FreeBSD' }
    ]
  }
]
function filter(inputValue, path) {
  return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
}
const Active = () => (
  <Space>
    <Cascader options={options} placeholder="Please select" showSearch={{ filter }} />
  </Space>
)
export default Active
