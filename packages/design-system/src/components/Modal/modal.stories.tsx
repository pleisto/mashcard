import { Modal } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Open the modal'
    },
    onClose: {
      description: '`((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)`'
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
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = args => <Modal {...args}>This is modal content</Modal>
export const Basic = Template.bind({})
