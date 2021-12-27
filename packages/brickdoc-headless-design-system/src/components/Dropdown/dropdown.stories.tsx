import { Dropdown } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Button, Menu } from '../'
export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  args: {
    placement: 'bottomStart',
    trigger: 'click',
    destroyPopupOnHide: 'false'
  },
  argTypes: {
    disabled: {
      description: 'Whether the dropdown menu is disabled	',
      control: {
        type: 'boolean'
      }
    },
    destroyPopupOnHide: {
      description: `Whether destroy dropdown when hidden`,
      control: {
        type: 'boolean'
      }
    },
    getPopupContainer: {
      description: '`() => HTMLElement` The DOM element that the tooltip is appended to'
    },
    overlay: {
      description: '`ReactElement | ()=>ReactElement` The content of the overlay'
    },
    overlayClassName: {
      description: '`string` The class name of the overlay'
    },
    overlayStyle: {
      description: '`object` The style of the overlay'
    },
    placement: {
      description: 'The position of the overlay',
      control: {
        type: 'select',
        options: ['bottomStart', 'bottomCenter', 'bottomEnd', 'topStart', 'topCenter', 'topEnd']
      }
    },
    trigger: {
      description: 'The trigger type of the dropdown.  Could be multiple by passing an array',
      control: {
        type: 'radio',
        options: ['hover', 'focus', 'click']
      }
    },
    visible: {
      description: '`boolean` Whether the overlay is visible',
      control: {
        type: 'boolean'
      }
    },
    onVisibleChange: {
      description: '`(visible: boolean) => void` Callback when the visibility of the overlay is changed'
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
A dropdown list.

#### When To Use

When there are more than a few options to choose from, you can wrap them in a \`Dropdown\`.
By hovering or clicking on the trigger, a dropdown menu will appear, which allows you to
choose an option and execute the relevant action.
`
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/YcVOEbdec2oqyKrYFSkeYW/Components-Base?node-id=4443%3A2286'
    }
  }
} as ComponentMeta<typeof Dropdown>

const Template: ComponentStory<typeof Dropdown> = args => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Dropdown {...args} />
  </div>
)

export const Basic = Template.bind({})
Basic.args = {
  overlay: (
    <Menu>
      <Menu.Item itemKey="one" label="One" onAction={() => console.log(123)}>
        Brickdoc
      </Menu.Item>
      <Menu.Item itemKey="two">Two</Menu.Item>
      <Menu.Item itemKey="three">Three</Menu.Item>
    </Menu>
  ),
  children: <Button>What does 42 mean?</Button>
}
