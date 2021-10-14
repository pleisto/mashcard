import { Checkbox } from '../../../components'

const plainOptions = ['Apple', 'Pear', 'Orange']
const defaultCheckedList = ['Apple', 'Orange']

const Active = () => <Checkbox.Group options={plainOptions} value={defaultCheckedList} />

export default Active
