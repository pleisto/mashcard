import { Switch } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Switch',
  component: Switch,
  args: {
    isDisabled: false,
    isLoading: false,
    size: 'small'
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
    isDisabled: {
      control: 'boolean'
    },
    isLoading: {
      control: 'boolean'
    },
    isReadOnly: {
      control: 'boolean'
    },
    isSelected: {
      control: 'boolean',
      description: 'For controlled components'
    },
    defaultSelected: {
      control: 'boolean',
      description: 'For uncontrolled components'
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: {
        type: 'radio'
      }
    },
    children: {
      description: '`React.ReactNode`'
    },
    onChange: {
      description: "`(isSelected: boolean) => void` Handler that is called when the Switch's selection state changes."
    },
    onFocus: {
      description: '`(e: FocusEvent) => void` Handler that is called when the element receives focus.'
    },
    onBlur: {
      description: '`(e: FocusEvent) => void`'
    },
    onFocusChange: {
      description: '`(isFocused: boolean) => void`'
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
loadding.args = { isLoading: true, children: 'Connect with Huston', defaultSelected: true }
