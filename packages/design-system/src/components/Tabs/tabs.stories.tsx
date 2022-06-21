import { Tabs, TabPane } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Tabs',
  component: Tabs,
  args: {
    type: 'line'
  },
  argTypes: {
    type: {
      options: ['line', 'card', 'editable-card'],
      control: {
        type: 'radio'
      }
    },
    hideAdd: {
      control: 'boolean'
    },
    centered: {
      control: 'boolean'
    },
    addIcon: {
      description: '`React.ReactNode`'
    },
    onEdit: {
      description: `(e: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => void`
    },
    className: {
      description: '`string`'
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
Alert component for feedback.

## When To Use

- When the content needs to be grouped and displayed in different modules or pages, you could use Tabs to switch between different groups or pages

`
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/YcVOEbdec2oqyKrYFSkeYW/Components-Base?node-id=697%3A2440'
    }
  }
} as ComponentMeta<typeof Tabs>

const Template: ComponentStory<typeof Tabs> = args => (
  <Tabs defaultActiveKey="2">
    <TabPane tab="tab 1" key="1">
      first
    </TabPane>
    <TabPane tab="tab 2" key="2">
      second
    </TabPane>
    <TabPane tab="tab 3" key="3">
      third
    </TabPane>
  </Tabs>
)
export const Basic = Template.bind({})
Basic.args = {}
