import { PopoverN } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Button } from '..'

export default {
  title: 'Components/PopoverN',
  component: PopoverN,
  args: {
    placement: 'top-start'
  },
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: `
The next generation of Popover, called PopoverN for ease of differentiation

based on floating-ui.
will replace Popover later on.

The floating card popped by clicking or hovering.

#### When To Use

- A simple popup menu to provide extra information or operations.

- Comparing with popover, besides information Popover card can also provide action elements like links and buttons.

`
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/YcVOEbdec2oqyKrYFSkeYW/Components-Base?node-id=4443%3A2288'
    }
  }
} as ComponentMeta<typeof PopoverN>

const Template: ComponentStory<typeof PopoverN> = args => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <PopoverN {...args} />
  </div>
)

export const Basic = Template.bind({})

Basic.args = {
  render: () => <p>42 is the meaning of life</p>,
  children: 'What does 42 mean?'
}

export const ContextMenu = Template.bind({})
ContextMenu.args = {
  render: () => <p>42 is the meaning of life</p>,
  children: (
    <div
      style={{
        height: '4rem',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#efefef'
      }}
    >
      Click
    </div>
  )
}
