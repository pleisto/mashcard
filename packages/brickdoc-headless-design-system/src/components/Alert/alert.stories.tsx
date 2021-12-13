import { Alert } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Alert',
  component: Alert,
  args: {
    type: 'success',
    closeIcon: true,
    icon: true
  },
  argTypes: {
    type: {
      options: ['info', 'error', 'success', 'warning'],
      control: {
        type: 'radio'
      }
    },
    closeIcon: {
      control: 'boolean'
    },
    icon: {
      control: 'boolean'
    },
    fullMode: {
      control: 'boolean'
    },
    onClose: {
      description: '`(e: PressEvent) => void`'
    },
    action: {
      description: '`React.ReactNode`'
    },
    title: {
      description: '`React.ReactNode`'
    },
    message: {
      description: '`React.ReactNode`'
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
Alert component for feedback.

## When To Use

- When you need to show alert messages to users.

- When you need a persistent static container which is closable by user actions.

`
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/YcVOEbdec2oqyKrYFSkeYW/Components-Base?node-id=1433%3A4880'
    }
  }
} as ComponentMeta<typeof Alert>

const Template: ComponentStory<typeof Alert> = args => <Alert {...args} />
export const Basic = Template.bind({})
Basic.args = {
  title: 'OpenDoc',
  message: 'A Possibility in the Computing World Suppressed by Steve Jobs.',
  type: 'info'
}

export const onlyMessage = Template.bind({})
onlyMessage.args = {
  message: 'Oops! Something went wrong.',
  type: 'error'
}
