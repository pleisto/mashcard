import { Menu } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Menu',
  component: Menu,
  args: {},
  argTypes: {
    className: {
      description: '`string`'
    },
    onAction: {
      description: '`(key: React.Key) => void`'
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
A list of actions or options.

#### When To Use

If you need to a list of actions or options that a user can choose.
`
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/q3K2LG7Tw0kL3ClLOl3A8w/Components-Web?node-id=12%3A9504'
    }
  }
} as ComponentMeta<typeof Menu>

const Template: ComponentStory<typeof Menu> = args => <Menu {...args} />

export const Basic = Template.bind({})
Basic.args = {
  'aria-label': 'menu',
  className: 'menu',
  children: [
    <Menu.Item itemKey="one" key="one" title="One">
      One
    </Menu.Item>,
    <Menu.Item itemKey="two" key="two">
      Two
    </Menu.Item>,
    <Menu.Item itemKey="three" key="three">
      Three
    </Menu.Item>
  ]
}

export const withGroup = Template.bind({})
withGroup.args = {
  'aria-label': 'menu',
  className: 'menu',
  children: [
    <Menu.Group key="section" title="section one">
      <Menu.Item itemKey="one" key="one">
        One
      </Menu.Item>
      <Menu.Item itemKey="two" key="two">
        Two
      </Menu.Item>
      <Menu.Item itemKey="three" key="three">
        Three
      </Menu.Item>
    </Menu.Group>,
    <Menu.Separator key="separator" />,
    <Menu.Group key="section two" title="section two">
      <Menu.Item itemKey="four" key="four">
        four
      </Menu.Item>
      <Menu.Item itemKey="five" key="five">
        five
      </Menu.Item>
      <Menu.Item itemKey="six" key="six">
        six
      </Menu.Item>
    </Menu.Group>
  ]
}

export const subMenu = Template.bind({})
subMenu.args = {
  'aria-label': 'menu',
  className: 'menu',
  children: [
    <Menu.Item itemKey="one" key="one">
      One
    </Menu.Item>,
    <Menu.Item itemKey="two" key="two">
      Two
    </Menu.Item>,
    <Menu.SubMenuItem label="Three" itemKey="three" key="three">
      <Menu.Item itemKey="four" key="four">
        Four
      </Menu.Item>
      <Menu.Item itemKey="five" key="five">
        Five
      </Menu.Item>
    </Menu.SubMenuItem>
  ]
}
