import { Button } from './index'
import { Add } from '@brickdoc/design-icons'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Button',
  component: Button,
  args: {
    type: 'secondary',
    size: 'medium',
    block: false,
    disabled: false,
    circle: false,
    htmlType: 'button',
    iconPosition: 'left'
  },
  argTypes: {
    type: {
      options: ['primary', 'secondary', 'danger', 'text'],
      control: {
        type: 'radio'
      }
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: {
        type: 'radio'
      }
    },
    block: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    },
    circle: {
      control: 'boolean'
    },
    loading: {
      control: 'boolean',
      description: '`boolean | { delay?: number }`'
    },
    htmlType: {
      options: ['button', 'submit', 'reset'],
      control: {
        type: 'radio'
      }
    },
    iconPosition: {
      options: ['left', 'right'],
      control: {
        type: 'radio'
      }
    },
    icon: {
      description: '`React.ReactNode`'
    },
    onPress: {
      description: '`(e: PressEvent) => void`'
    },
    role: {
      description: '`React.AriaRole`'
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
To trigger an operation.

#### When To Use

A button means an operation (or a series of operations). Clicking a button will trigger corresponding business logic.
`
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/YcVOEbdec2oqyKrYFSkeYW/Components-Base?node-id=24%3A25'
    }
  }
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = args => <Button {...args} />

export const Basic = Template.bind({})
Basic.args = { type: 'primary', children: '42 is the meaning of life' }

export const iconOnly = Template.bind({})
iconOnly.args = { icon: <Add />, 'aria-label': 'Add Record', circle: true, size: 'large' }

export const loadding = Template.bind({})
loadding.args = { loading: true, children: 'Loading...' }
