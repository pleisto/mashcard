/* eslint-disable max-classes-per-file */
import React from 'react'
import { Story } from '@storybook/react'
import { Menu, MenuProps, Button } from '../'
import {
  Mail as MailOutlined,
  AppStore as AppstoreOutlined,
  Setting as SettingOutlined,
  MenuUnfold as MenuUnfoldOutlined,
  MenuFold as MenuFoldOutlined
} from '../icon'

export default {
  title: 'ReactComponents/Menu',
  component: Menu,
  parameters: {
    docs: {
      description: {
        component: `
A versatile menu for navigation.

#### When To Use

Navigation is an important part of any website, as a good navigation setup allows users to move around the site quickly and efficiently. Brickdoc Design System offers top and side navigation options. Top navigation provides all the categories and functions of the website. Side navigation provides the multi-level structure of the website.

More layouts with navigation: Layout.

#### API

\`\`\`jsx
<Menu>
  <Menu.Item>Menu</Menu.Item>
  <SubMenu title="SubMenu">
    <Menu.Item>SubMenuItem</Menu.Item>
  </SubMenu>
</Menu>
\`\`\`

##### Menu

| Param | Description | Type | Default value |
| --- | --- | --- | --- |
| defaultOpenKeys | Array with the keys of default opened sub menus | string\\[] | - |
| defaultSelectedKeys | Array with the keys of default selected menu items | string\\[] | - |
| expandIcon | custom expand icon of submenu | ReactNode \\| \`(props: SubMenuProps & { isSubMenu: boolean }) => ReactNode\` | - |
| forceSubMenuRender | Render submenu into DOM before it becomes visible | boolean | false |
| inlineCollapsed | Specifies the collapsed status when menu is inline mode | boolean | - |
| inlineIndent | Indent (in pixels) of inline menu items on each level | number | 24 |
| mode | Type of menu | \`vertical\` \\| \`horizontal\` \\| \`inline\` | \`vertical\` |
| multiple | Allows selection of multiple items | boolean | false |
| openKeys | Array with the keys of currently opened sub-menus | string\\[] | - |
| overflowedIndicator | Customized icon when menu is collapsed | ReactNode | - |
| selectable | Allows selecting menu items | boolean | true |
| selectedKeys | Array with the keys of currently selected menu items | string\\[] | - |
| style | Style of the root node | CSSProperties | - |
| subMenuCloseDelay | Delay time to hide submenu when mouse leaves (in seconds) | number | 0.1 |
| subMenuOpenDelay | Delay time to show submenu when mouse enters, (in seconds) | number | 0 |
| theme | Color theme of the menu | \`light\` \\| \`dark\` | \`light\` |
| triggerSubMenuAction | Which action can trigger submenu open/close | \`hover\` \\| \`click\` | \`hover\` |
| onClick | Called when a menu item is clicked | function({ item, key, keyPath, domEvent }) | - |
| onDeselect | Called when a menu item is deselected (multiple mode only) | function({ item, key, keyPath, selectedKeys, domEvent }) | - |
| onOpenChange | Called when sub-menus are opened or closed | function(openKeys: string\\[]) | - |
| onSelect | Called when a menu item is selected | function({ item, key, keyPath, selectedKeys, domEvent }) | - |

> More options in [rc-menu](https://github.com/react-component/menu#api)

##### Menu.Item

| Param | Description | Type | Default value |
| --- | --- | --- | --- | --- |
| danger | Display the danger style | boolean | false |
| disabled | Whether menu item is disabled | boolean | false |
| icon | The icon of the menu item | ReactNode | - |
| key | Unique ID of the menu item | string | - |
| title | Set display title for collapsed item | string | - |


\`\`\`jsx
 <Menu.Item>
   <PieChartOutlined />
   <span>Option 1</span>
 </Menu.Item>
 <Menu.SubMenu
   title={
     <>
       <PieChartOutlined />
       <span>Option 2</span>
     </>
   }
 >
   ...
 </Menu.SubMenu>
 \`\`\`

##### Menu.SubMenu

| Param | Description | Type | Default value |
| --- | --- | --- | --- |
| children | Sub-menus or sub-menu items | Array&lt;MenuItem \\| SubMenu> | - |
| disabled | Whether sub-menu is disabled | boolean | false |
| icon | Icon of sub menu | ReactNode | - |
| key | Unique ID of the sub-menu | string | - |
| popupClassName | Sub-menu class name, not working when \`mode="inline"\` | string | - |
| popupOffset | Sub-menu offset, not working when \`mode="inline"\` | \\[number, number] | - |
| title | Title of sub menu | ReactNode | - |
| onTitleClick | Callback executed when the sub-menu title is clicked | function({ key, domEvent }) | - |

##### Menu.ItemGroup

| Param | Description | Type | Default value |
| --- | --- | --- | --- |
| children | Sub-menu items | MenuItem\\[] | - |
| title | The title of the group | ReactNode | - |

##### Menu.Divider

Divider line in between menu items, only used in vertical popup Menu or Dropdown Menu.
`
      }
    }
  }
}

const { SubMenu } = Menu

class App extends React.Component {
  state = {
    current: 'mail'
  }

  handleClick = e => {
    console.log('click ', e)
    this.setState({ current: e.key })
  }

  render() {
    const { current } = this.state
    return (
      <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="mail" icon={<MailOutlined />}>
          Navigation One
        </Menu.Item>
        <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
          Navigation Two
        </Menu.Item>
        <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Navigation Three - Submenu">
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            Navigation Four - Link
          </a>
        </Menu.Item>
      </Menu>
    )
  }
}

const Template: Story<MenuProps> = _args => (
  <>
    <App />
  </>
)
export const Base = Template.bind({})

class InlineMenuApp extends React.Component {
  state = {
    collapsed: false
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    return (
      <div style={{ width: 256 }}>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" theme="dark" inlineCollapsed={this.state.collapsed}>
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
}

export const CollapsedInlineMenu: Story = _args => {
  return <InlineMenuApp />
}
