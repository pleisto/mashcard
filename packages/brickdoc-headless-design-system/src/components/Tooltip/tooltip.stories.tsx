import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Tooltip } from './index'
import { Button } from '../'
import { triggerArgTypes } from './trigger.docs'
export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    arrowPointAtCenter: false,
    autoAdjustOverflow: true,
    defaultVisible: false,
    destroyTooltipOnHide: false,
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    placement: 'top',
    trigger: ['hover', 'focus'],
    visible: false
  },
  argTypes: {
    title: {
      description: '`ReactNode` The text shown in the tooltip',
      control: {
        type: 'text'
      }
    },
    ...triggerArgTypes
  },
  parameters: {
    docs: {
      description: {
        component: `
A simple text popup tip.

#### When To Use

- The tip is shown on mouse enter, and is hidden on mouse leave. The Tooltip doesn't support complex text or operations.

- To provide an explanation of a button/text/operation. It's often used instead of the html title attribute.
`
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/YcVOEbdec2oqyKrYFSkeYW/Components-Base?node-id=4443%3A2288'
    }
  }
} as ComponentMeta<typeof Tooltip>

const Template: ComponentStory<typeof Tooltip> = args => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
    <Tooltip {...args} />
  </div>
)

export const Basic = Template.bind({})
Basic.args = { title: '42 is the meaning of life', children: <Button>What does 42 mean?</Button> }
