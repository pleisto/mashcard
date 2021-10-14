import { Radio } from '../../../components'

const plainOptions = ['Apple', 'Pear', 'Orange']
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' }
]
const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: true }
]

const Base = () => (
  <>
    <Radio.Group options={options} optionType="button" />
    <br />
    <br />
    <Radio.Group options={plainOptions} />
    <br />
    <Radio.Group options={optionsWithDisabled} />
  </>
)

export default Base
