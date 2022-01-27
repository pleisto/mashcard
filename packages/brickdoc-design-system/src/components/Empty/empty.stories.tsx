import { Empty } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { EmptyType } from './constants'
import { Button } from '../'

export default {
  title: 'Components/Empty',
  component: Empty,
  args: {},
  argTypes: {
    prefixCls: {
      description: '',
      control: {
        type: 'string'
      }
    },

    id: {
      description: 'globally unique ID',
      control: {
        type: 'string'
      }
    },

    type: {
      description: '`Switching display types` ',
      options: [EmptyType.Empty, EmptyType.Found],
      control: { type: 'radio' },
      defaultValue: EmptyType.Empty
    },

    description: {
      description: '`string`'
    },

    action: {
      description: '`ReactNode`'
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
Empty state placeholder.

###When To Use
- When there is no data provided, display for friendly tips.
- User tutorial to create something in fresh new situation.
`
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/YcVOEbdec2oqyKrYFSkeYW/Components-Base?node-id=5054%3A2169'
    }
  }
} as ComponentMeta<typeof Empty>

const Template: ComponentStory<typeof Empty> = args => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Empty type={args.type} />

    <Empty type={args.type} description={args.description} />

    <Empty {...args} />
  </div>
)

export const Basic = Template.bind({})
Basic.args = {
  description: 'There is empty.',
  action: (
    <Button size="sm" type="primary">
      go to
    </Button>
  )
}

export const Found = Template.bind({})
Found.args = {
  description: 'There is found.',
  type: EmptyType.Found,
  action: (
    <Button size="sm" type="primary">
      go to
    </Button>
  )
}
