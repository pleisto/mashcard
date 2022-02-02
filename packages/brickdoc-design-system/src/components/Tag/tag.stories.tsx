import { Tag } from './index'

import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Tag',
  component: Tag,
  args: {
    text: 'default',
    value: 1
  },
  argTypes: {
    text: {
      description: ``,
      control: {
        type: 'text'
      }
    },
    value: {
      description: '`string | number`',
      control: {
        type: 'string'
      }
    },
    closable: {
      description: `Toggle whether the tag can be closed`,
      control: {
        type: 'boolean'
      }
    },
    size: {
      control: {
        type: 'radio',
        options: ['sm', 'md', 'lg']
      }
    },
    color: {
      control: {
        type: 'select',
        options: ['none', 'primary', 'red', 'cyan', 'blue']
      },
      defaultValue: 'primary'
    },
    border: {
      control: {
        type: 'boolean'
      }
    },
    prefixCls: {
      description: '`string`'
    },
    onClick: {
      description: '`(e: MouseEvent<HTMLElement> | PressEvent) => void`'
    },
    onClose: {
      description: '`(e: MouseEvent<HTMLElement>, value: ReactNode) => void`'
    },
    children: {
      description: '`ReactNode`'
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
Tag component for feedback.

## When To Use

- Tag component is used to display a collection of concise information for rapid identification and grouping.

`
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/YcVOEbdec2oqyKrYFSkeYW/Components-Base?node-id=697%3A2440'
    }
  }
} as ComponentMeta<typeof Tag>

const Template: ComponentStory<typeof Tag> = args => <Tag {...args} />
export const TagBasic = Template.bind({})
TagBasic.args = {
  onClick: e => {
    console.log(e)
  }
}
