import { Checkbox } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {
    disabled: false
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
Checkbox component.

#### When To Use

- Used for selecting multiple values from several options.
- If you use only one checkbox, it is the same as using Switch to toggle between two states. The difference is that
Switch will trigger the state change directly, but Checkbox just marks the state as changed and this needs to be
submitted.`
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/YcVOEbdec2oqyKrYFSkeYW/Components-Base?node-id=5013%3A2126'
    }
  }
} as ComponentMeta<typeof Checkbox>

const Template: ComponentStory<typeof Checkbox> = args => <Checkbox {...args} />

export const Basic = Template.bind({})
Basic.args = { children: 'Sign the Contributor License Agreement' }
