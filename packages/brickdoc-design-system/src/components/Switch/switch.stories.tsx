import { Switch } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Switch',
  component: Switch,
  args: {
    disabled: false,
    loading: false,
    size: 'sm'
  },
  argTypes: {
    name: {
      control: 'text',
      description: '`string` The name of the input element, used when submitting an HTML form'
    },
    value: {
      control: 'text',
      description: '`string` The value of the input element, used when submitting an HTML form'
    },
    disabled: {
      control: 'boolean'
    },
    loading: {
      control: 'boolean'
    },
    checked: {
      control: 'boolean',
      description: 'For controlled components'
    },
    labelFirst: {
      control: 'boolean',
      description: 'Whether to put the label before the switch'
    },
    defaultChecked: {
      control: 'boolean',
      description: 'For uncontrolled components'
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'radio'
      }
    },
    children: {
      description: '`React.ReactNode`'
    },
    onChange: {
      description:
        "`(checked: boolean, e: ChangedEvent) => void` Handler that is called when the Switch's selection state changes."
    },
    onFocus: {
      description: '`(e: FocusEvent) => void` Handler that is called when the element receives focus.'
    },
    onBlur: {
      description: '`(e: FocusEvent) => void`'
    },
    onKeyDown: {
      description: '`(e: KeyboardEvent) => void`'
    },
    onKeyUp: {
      description: '`(e: KeyboardEvent) => void`'
    },
    className: {
      description: '`string`'
    },
    style: {
      description: '`React.CSSProperties`'
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
Switching Selector.

#### When To Use

- If you need to represent the switching between two states or on-off state.

- The difference between Switch and Checkbox is that Switch will trigger a state change directly when you toggle it, while Checkbox is generally used for state marking, which should work in conjunction with submit operation.
`
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/YcVOEbdec2oqyKrYFSkeYW/Components-Base?node-id=24%3A2192'
    }
  }
} as ComponentMeta<typeof Switch>

const Template: ComponentStory<typeof Switch> = args => <Switch {...args} />

export const Basic = Template.bind({})
Basic.args = { children: 'Autopilot Mode' }

export const loadding = Template.bind({})
loadding.args = { loading: true, children: 'Connect with Huston', defaultChecked: true }
