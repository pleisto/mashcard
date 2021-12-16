import { Menu } from './index'
import { Link, Check } from '@brickdoc/design-icons'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Menu/Item',
  component: Menu.Item,
  args: {
    label: 'label',
    description: 'description',
    tip: '',
    key: 'item',
    danger: false
  },
  argTypes: {
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
    key: {
      type: 'string'
    },
    danger: {
      type: 'boolean'
    },
    onAction: {
      description: '`(key: ReactKey) => void`'
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

export const withIcon = Template.bind({})
withIcon.args = {
  icon: <Link />
}

export const withTip = Template.bind({})
withTip.args = {
  tip: <Check />
}
