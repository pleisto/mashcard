import { Popover } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Button } from '../'
import { triggerArgTypes } from '../Tooltip/trigger.docs'

export default {
  title: 'Components/Popover',
  component: Popover,
  args: {
    placement: 'top',
    trigger: 'click'
  },
  argTypes: {
    title: {
      description: '`ReactNode|undefined` The text shown in the popover'
    },
    content: {
      description: `\`ReactNode\` The content of the popover`
    },
    ...triggerArgTypes
  },
  parameters: {
    docs: {
      description: {
        component: `
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
} as ComponentMeta<typeof Popover>

const Template: ComponentStory<typeof Popover> = args => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
    <Popover {...args} />
  </div>
)

export const Basic = Template.bind({})
Basic.args = {
  title: 'Answer',
  content: <p>42 is the meaning of life</p>,
  children: <Button>What does 42 mean?</Button>
}

export const ContextMenu = Template.bind({})
ContextMenu.args = {
  title: 'Answer',
  content: <p>42 is the meaning of life</p>,
  trigger: 'contextMenu',
  children: (
    <div
      style={{
        height: '4rem',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#efefef'
      }}>
      Right Click on Here
    </div>
  )
}
