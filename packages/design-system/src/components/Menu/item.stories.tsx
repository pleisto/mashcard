import { Menu } from './index'
import { Link, Check } from '@mashcard/design-icons'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Menu/Item',
  component: Menu.Item,
  args: {
    itemKey: 'key',
    label: 'label',
    description: 'description',
    tip: '',
    danger: false,
    active: false
  },
  argTypes: {
    itemKey: {
      type: 'string'
    },
    className: {
      description: '`string`'
    },
    label: {
      description: '`string | React.ReactElement`'
    },
    description: {
      description: '`string | React.ReactElement`'
    },
    icon: {
      description: '`React.ReactNode`'
    },
    tip: {
      description: '`string | React.ReactElement`'
    },
    danger: {
      type: 'boolean'
    },
    active: {
      type: 'boolean'
    },
    onAction: {
      description: '`(key: React.Key) => void`'
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
A item represents for action or option inside menu
`
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/q3K2LG7Tw0kL3ClLOl3A8w/Components-Web?node-id=12%3A9504'
    }
  }
} as ComponentMeta<typeof Menu.Item>

const Template: ComponentStory<typeof Menu.Item> = args => (
  <Menu>
    <Menu.Item {...args} />
  </Menu>
)

export const Basic = Template.bind({})
Basic.args = {}

export const active = Template.bind({})
active.args = {
  active: true
}

export const withIcon = Template.bind({})
withIcon.args = {
  icon: <Link />
}

export const withTip = Template.bind({})
withTip.args = {
  tip: <Check />
}

export const inputItem = Template.bind({})
inputItem.args = {
  children: <input placeholder="input anything" />
}
