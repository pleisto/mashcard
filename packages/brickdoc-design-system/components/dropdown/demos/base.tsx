import React from 'react'
import { Menu, Dropdown } from '../../../components'
import { Down as DownOutlined } from '../../icon'

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item icon={<DownOutlined />} disabled>
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item disabled>
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    </Menu.Item>
    <Menu.Item danger>a danger item</Menu.Item>
  </Menu>
)

const Base = () => (
  <>
    <Dropdown overlay={menu}>
      <a className="ant-dropdown-link">
        Hover me <DownOutlined />
      </a>
    </Dropdown>
    <br />
    <br />
    <Dropdown.Button placement="topCenter" overlay={menu}>
      Dropdown
    </Dropdown.Button>
    <br />
    <br />
    <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
      <a className="ant-dropdown-link">
        Click me <DownOutlined />
      </a>
    </Dropdown>
    <br />
    <br />
    <Dropdown.Button
      overlay={menu}
      buttonsRender={([leftButton, rightButton]) => [leftButton, React.cloneElement(rightButton, { loading: true })]}
    >
      Loading
    </Dropdown.Button>
  </>
)
export default Base
