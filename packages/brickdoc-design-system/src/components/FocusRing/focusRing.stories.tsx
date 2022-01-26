import { FocusRing } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Utils/FocusRing',
  component: FocusRing,
  args: {
    within: false
  },
  argTypes: {
    focusClass: {
      description: '`string` CSS class to apply when the element is focused.'
    },
    focusRingClass: {
      control: 'text',
      description: '`string` CSS class to apply when the element has keyboard focus.'
    },
    within: {
      control: 'boolean',
      description: `Whether to show the focus ring when something inside the container element has focus (true),
      or only if the container itself has focus (false).`
    },
    isTextInput: {
      control: 'boolean',
      description: 'Whether the element is a text input.'
    },
    autoFocus: {
      control: 'boolean',
      description: 'Whether the element will be auto focused.'
    },
    children: {
      description: '`React.ReactNode`'
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
A utility component that applies a CSS class when an element has keyboard focus.
Focus rings are visible only when the user is interacting with a keyboard, not with a mouse,
touch, or other input methods.
`
      }
    }
  }
} as ComponentMeta<typeof FocusRing>

const Template: ComponentStory<typeof FocusRing> = args => (
  <FocusRing {...args}>
    <button>Press Tab</button>
  </FocusRing>
)

export const Basic = Template.bind({})
Basic.args = {}
