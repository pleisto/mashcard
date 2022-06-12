import { TagGroup } from './TagGroup'

import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/TagGroup',
  component: TagGroup,
  args: {},
  argTypes: {
    tagList: {
      description: `render tags`,
      control: {
        type: 'object'
      }
    },
    size: {
      control: {
        type: 'radio',
        options: ['sm', 'md', 'lg']
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
TagGroup component for feedback.

## When To Use

- TagGroup component is used to display a collection of concise information for rapid identification and grouping.

`
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/q3K2LG7Tw0kL3ClLOl3A8w/Components-Web?node-id=753%3A15255'
    }
  }
} as ComponentMeta<typeof TagGroup>

const Template: ComponentStory<typeof TagGroup> = args => <TagGroup {...args} />
export const Basic = Template.bind({})

Basic.args = {
  tagList: [
    { color: 'primary', text: 'Abc', value: 1 },
    { color: 'blue', text: 'Hotsoon', value: 2 },
    { color: 'cyan', text: 'Toutiao', value: 3 },
    { color: 'red', text: 'Pipixia', value: 4 },
    { color: 'none', text: 'Vigo', value: 5 }
  ]
}
