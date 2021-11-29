import { Button, Space, Dropdown, Menu } from '../../../components'
const MenuItem = Menu.Item
const DropdownButton = Dropdown.Button

const Active = () => (
  <Space>
    <Button loading type="primary">
      Loading
    </Button>
    <Button type="primary">primary</Button>
    <Button>secondary</Button>
    <DropdownButton
      overlay={
        <Menu>
          <MenuItem>1st item</MenuItem>
          <MenuItem>2nd item</MenuItem>
          <MenuItem>3rd item</MenuItem>
        </Menu>
      }
    >
      Actions
    </DropdownButton>
  </Space>
)

export default Active
