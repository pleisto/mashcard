import { Input } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Edit } from '@brickdoc/design-icons'

export default {
  title: 'Components/Input',
  component: Input,
  args: {
    size: 'medium'
  },
  argTypes: {
    name: {
      control: 'text',
      description: '`string` The name of the input element, used when submitting an HTML form'
    },
    disabled: {
      control: 'boolean'
    },
    placeholder: {
      control: 'text',
      description: '`string` The placeholder text for the input'
    },
    value: {
      control: 'text',
      description: '`string` The value of the input element, used when submitting an HTML form'
    },
    defaultValue: {
      control: 'text',
      description: '`string` The default value of the input element, used when submitting an HTML form'
    },
    onChange: {
      description: '`(e: React.ChangeEvent<HTMLTextAreaElement>) => void`'
    },
    type: {
      description: '`HTML Input Types` The type of the input element, used when submitting an HTML form'
    },
    onPressEnter: {
      description: '`(e: React.KeyboardEvent<HTMLTextAreaElement>) => void`'
    },
    className: {
      description: '`string`'
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: {
        type: 'radio'
      }
    },
    style: {
      description: '`React.CSSProperties`'
    },
    prefix: {
      description: '`React.ReactNode`'
    },
    suffix: {
      description: '`React.ReactNode`'
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
A basic widget for getting the user input is a text field. Keyboard and mouse can be used for providing or changing data.
`
      }
    }
  }
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = args => <Input {...args} />

export const Basic = Template.bind({})
Basic.args = {
  'aria-label': 'Input Example',
  placeholder: 'Type something...'
}

export const withPrefix = Template.bind({})
withPrefix.args = {
  defaultValue: '333.22',
  prefix: <Edit />,
  suffix: 'USD',
  type: 'number'
}

export const Invalid = Template.bind({})
Invalid.args = {
  defaultValue: 'Create Computer Virus',
  'aria-invalid': 'true'
}
