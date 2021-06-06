import React from "react"
import { Story } from "@storybook/react"
import { Menu, Dropdown, DropdownProps } from "../../"
import { Down  as DownOutlined } from '../icon'


export default {
  title: "ReactComponents/Dropdown",
  component: Dropdown,
  parameters: {
  docs: {
    description: {
      component: `
A dropdown list.

#### When To Use

When there are more than a few options to choose from, you can wrap them in a Dropdown.
By hovering or clicking on the trigger, a dropdown menu will appear, which allows you to
choose an option and execute the relevant action.

#### API

##### Dropdown

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| arrow | Whether the dropdown arrow should be visible | boolean | false |
| disabled | Whether the dropdown menu is disabled | boolean | - |
| getPopupContainer | To set the container of the dropdown menu. The default is to create a div element in body, but you can reset it to the scrolling area and make a relative reposition.  | (triggerNode: HTMLElement) => HTMLElement | () => document.body |
| overlay | The dropdown menu | Menu \\| () => Menu | - |
| overlayClassName | The class name of the dropdown root element | string | - |
| overlayStyle | The style of the dropdown root element | CSSProperties | - |
| placement | Placement of popup menu: \`bottomLeft\`, \`bottomCenter\`, \`bottomRight\`, \`topLeft\`, \`topCenter\` or \`topRight\` | string | \`bottomLeft\` |
| trigger | The trigger mode which executes the dropdown action. Note that hover can't be used on touchscreens | Array&lt;\`click\`\\|\`hover\`\\|\`contextMenu\`> | \\[\`hover\`] |
| visible | Whether the dropdown menu is currently visible | boolean | - |
| onVisibleChange | Called when the visible state is changed | (visible: boolean) => void | - |


> Warning: You must set a unique \`key\` for \`Menu.Item\`.
>
> Menu of Dropdown is unselectable by default, you can make it selectable via \`<Menu selectable>\`.

##### Dropdown.Button

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| buttonsRender | Custom buttons inside Dropdown.Button | (buttons: ReactNode\\[]) => ReactNode\\[] | - |
| disabled | Whether the dropdown menu is disabled | boolean | - |
| icon | Icon (appears on the right) | ReactNode | - |
| overlay | The dropdown menu | Menu | - |
| placement | Placement of popup menu: \`bottomLeft\` \`bottomCenter\` \`bottomRight\` \`topLeft\` \`topCenter\` \`topRight\` | string | \`bottomLeft\` |
| size | Size of the button, the same as Button | string | \`default\` |
| trigger | The trigger mode which executes the dropdown action | Array&lt;\`click\`\\|\`hover\`\\|\`contextMenu\`> | \\[\`hover\`] |
| type | Type of the button, the same as Button | string | \`default\` |
| visible | Whether the dropdown menu is currently visible | boolean | - |
| onClick | The same as Button: called when you click the button on the left | (event) => void | - |
| onVisibleChange | Called when the visible state is changed | (visible: boolean) => void | - |
`
    }
  }
}
}

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
const Template: Story<DropdownProps> = (_args) =>
  <>
    <Dropdown overlay={menu}>
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        Hover me <DownOutlined />
      </a>
    </Dropdown>
    <br/><br/>
    <Dropdown.Button placement="topCenter" overlay={menu}>
      Dropdown
    </Dropdown.Button>
    <br/><br/>
    <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        Click me <DownOutlined />
      </a>
    </Dropdown>
    <br/><br/>
    <Dropdown.Button
      overlay={menu}
      buttonsRender={([leftButton, rightButton]) => [

          leftButton
        ,
        React.cloneElement(rightButton, { loading: true }),
      ]}
    >
      Loading
    </Dropdown.Button>
  </>
export const Base = Template.bind({})




