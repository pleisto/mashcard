import { ConfirmDialog } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Modal/ConfirmDialog',
  component: ConfirmDialog,
  args: {
    onConfirm: () => {},
    onCancel: () => {}
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Open the modal'
    },
    keepMounted: {
      control: 'boolean',
      description: 'Prevent the modal from unmounting when it is closed'
    },
    disablePortal: {
      control: 'boolean',
      description: "Disable the portal behavior. The children stay within it's parent DOM hierarchy."
    },
    disableEnforceFocus: {
      control: 'boolean',
      description: 'Disables the `autoFocus` behavior'
    },
    hideBackdrop: {
      control: 'boolean',
      description: 'Do not render the backdrop'
    },
    disableScrollLock: {
      control: 'boolean',
      description: 'Disable the scroll lock behavior'
    },
    disableEscapeKeyDown: {
      control: 'boolean',
      description: 'Disable the `ESC` key press from closing the modal'
    },
    onBackdropClick: {
      description: 'Callback fired when the backdrop is clicked.'
    },
    onCancel: {
      description: 'on Cancel button click'
    },
    onConfirm: {
      description: 'on Confirm button click'
    },
    cancelBtnText: {
      description: 'Cancel button text'
    },
    confirmBtnText: {
      description: 'Confirm button text'
    },
    cancelBtnProps: {
      description: 'Cancel button props'
    },
    confirmBtnProps: {
      description: 'Confirm button props'
    },
    width: {
      description: 'Modal width'
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
Modal component. based https://mui.com/api/modal-unstyled/

`
      }
    }
  }
} as ComponentMeta<typeof ConfirmDialog>

const Template: ComponentStory<typeof ConfirmDialog> = args => (
  <ConfirmDialog {...args}>This is modal content</ConfirmDialog>
)
export const Basic = Template.bind({})
