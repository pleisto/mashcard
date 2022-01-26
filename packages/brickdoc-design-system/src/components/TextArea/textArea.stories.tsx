import { TextArea } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/TextArea',
  component: TextArea,
  args: {
    autoSize: false
  },
  argTypes: {
    name: {
      control: 'text',
      description: '`string` The name of the input element, used when submitting an HTML form'
    },
    disabled: {
      control: 'boolean'
    },
    value: {
      control: 'text',
      description: '`string` The value of the input element, used when submitting an HTML form'
    },
    defaultValue: {
      control: 'text',
      description: '`string` The default value of the input element, used when submitting an HTML form'
    },
    autoSize: {
      description:
        '`boolean|object` Height autosize feature, can be set to true | false or an object  like { minRows: 2, maxRows: 6 }	',
      control: 'boolean'
    },
    onChange: {
      description: '`(e: React.ChangeEvent<HTMLTextAreaElement>) => void`'
    },
    onPressEnter: {
      description: '`(e: React.KeyboardEvent<HTMLTextAreaElement>) => void`'
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
A textarea component for React which grows with content.
`
      }
    }
  }
} as ComponentMeta<typeof TextArea>

const Template: ComponentStory<typeof TextArea> = args => <TextArea {...args} />

export const Basic = Template.bind({})
Basic.args = { defaultValue: 'It was a dark and stormy night...', 'aria-label': 'TextArea Example' }
