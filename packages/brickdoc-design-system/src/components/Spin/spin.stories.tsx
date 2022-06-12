import { Spin } from './index'

import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Spin',
  component: Spin,
  args: {},
  argTypes: {
    size: {
      control: {
        type: 'radio',
        options: ['sm', 'md', 'lg']
      }
    },
    color: {
      control: {
        type: 'select',
        options: ['light', 'dark']
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
## When To Use

- Spin is used to inform the user that the content is loading and may take an uncertain period of time.

`
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/1jTDo6mGYGT2qoweGlYP4E/Icons?node-id=1231%3A1177'
    }
  }
} as ComponentMeta<typeof Spin>

const Template: ComponentStory<typeof Spin> = args => <Spin {...args} />
export const TagBasic = Template.bind({})
TagBasic.args = {}
