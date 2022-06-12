import { FormControl } from './FormControl'
import { Input } from '../Input'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Form/FormControl',
  component: FormControl,
  args: {
    layout: 'vertical'
  },
  argTypes: {
    label: {
      description: 'Label for the control'
    },
    requiredMask: {
      description: 'Whether the label should be marked as required',
      control: {
        type: 'boolean'
      }
    },
    layout: {
      description: 'Layout of the control',
      control: {
        type: 'radio'
      },
      options: ['horizontal', 'vertical']
    },
    description: {
      description: 'Description for the control'
    },
    invalidMessage: {
      description: 'Message to display when the control is invalid'
    },
    inlineWrapper: {
      control: {
        type: 'boolean'
      },
      description: 'inline wrapper for the action buttons'
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
FormControl is used to wrap for all inputs (Select, TextInput, Textarea and others).
It includes label with optional required asterisk, description and error message.
`
      }
    }
  }
} as ComponentMeta<typeof FormControl>

const Template: ComponentStory<typeof FormControl> = args => (
  <FormControl {...args}>
    <Input type="number" aria-invalid />
  </FormControl>
)
export const Basic = Template.bind({})
Basic.args = {
  label: 'Example',
  requiredMask: true,
  description: 'Please enter a number, we need some entropy',
  invalidMessage: 'This is an invalid message'
}
