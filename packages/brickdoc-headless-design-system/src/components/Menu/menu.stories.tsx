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
    children: {
      description: '`ReactElement[]`'
    },
    onAction: {
      description: '`(key: ReactKey) => void`'
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
    <Menu.Item key="one" label="One">
      One
    </Menu.Item>,
    <Menu.Item key="two">Two</Menu.Item>,
    <Menu.Item key="three">Three</Menu.Item>
  ]
}

export const withSection = Template.bind({})
withSection.args = {
  'aria-label': 'menu',
  className: 'menu',
  children: [
    <Menu.Section key="section" title="section one">
      <Menu.Item key="one">One</Menu.Item>
      <Menu.Item key="two">Two</Menu.Item>
      <Menu.Item key="three">Three</Menu.Item>
    </Menu.Section>,
    <Menu.Section key="section two" title="section two">
      <Menu.Item key="four">four</Menu.Item>
      <Menu.Item key="five">five</Menu.Item>
      <Menu.Item key="six">six</Menu.Item>
    </Menu.Section>
  ]
}
