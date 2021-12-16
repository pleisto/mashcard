import React, { useState, useCallback } from 'react'
import { DeprecatedMenu as Menu, Button } from '../../../components'
import {
  Mail as MailOutlined,
  AppStore as AppstoreOutlined,
  Setting as SettingOutlined,
  MenuUnfold as MenuUnfoldOutlined,
  MenuFold as MenuFoldOutlined
} from '../../icon'
const { SubMenu } = Menu

const Active = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const handleClick = useCallback(() => {
    setCollapsed(!collapsed)
  }, [collapsed, setCollapsed])
  return (
    <div style={{ width: 256 }}>
      <Button type="primary" onClick={handleClick} style={{ marginBottom: 16 }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
      >
        <Menu.Item key="1" icon={<AppstoreOutlined />}>
          Option 1
        </Menu.Item>
        <Menu.Item key="2" icon={<SettingOutlined />}>
          Option 2
        </Menu.Item>
        <Menu.Item key="3" icon={<MailOutlined />}>
          Option 3
        </Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    </div>
  )
}
export default Active
