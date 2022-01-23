import { Dialog, useDialogState } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Button } from '../'

export default {
  title: 'Components/Dialog',
  component: Dialog,
  args: {
    type: 'modal',
    mask: true
  },
  argTypes: {
    state: {
      description: 'return of `useDialogState()`'
    },
    hideOnEsc: {
      control: {
        type: 'boolean'
      },
      description: 'When enabled, user can hide the dialog by pressing Escape.'
    },
    hideOnClickOutside: {
      control: {
        type: 'boolean'
      },
      description: 'When enabled, user can hide the dialog by clicking outside it.'
    },
    preventBodyScroll: {
      control: {
        type: 'boolean'
      },
      description: "When enabled, user can't scroll on body when the dialog is visible."
    },
    type: {
      description: 'Switching display types',
      options: ['modal', 'alert'],
      control: {
        type: 'radio'
      }
    },
    mask: {
      control: {
        type: 'boolean'
      },
      description: 'Whether to show a mask or not.'
    },
    closable: {
      control: {
        type: 'boolean'
      },
      description: 'Whether to show a dismiss icon button or not. default is true if `type` is `modal`'
    },
    title: {
      description: 'The title of the dialog.'
    },
    onCancelClick: {
      description: 'The callback function when user clicks the cancel button.'
    },
    onOkClick: {
      description: 'The callback function when user clicks the ok button.'
    },
    okType: {
      description: 'The type of the ok button.'
    },
    okText: {
      description: 'The text of the ok button.'
    },
    cancelText: {
      description: 'The text of the cancel button.'
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
      url: 'https://www.figma.com/file/YcVOEbdec2oqyKrYFSkeYW/Components-Base?node-id=1373%3A4882'
    }
  }
} as ComponentMeta<typeof Dialog>

const Template: ComponentStory<typeof Dialog> = args => {
  const dialogState = useDialogState()
  return (
    <>
      <Button onClick={dialogState.show}>Click me</Button>
      <Dialog {...args} state={dialogState} onOkClick={dialogState.hide} onCancelClick={dialogState.hide}>
        {args.children}
      </Dialog>
    </>
  )
}

export const Basic = Template.bind({})
Basic.args = {
  type: 'modal',
  title: 'Example title',
  children: 'Example content'
}

export const Alert = Template.bind({})
Alert.args = {
  type: 'alert',
  children: 'Are you sure you want to delete this property?',
  okType: 'danger',
  okText: 'Delete'
}
