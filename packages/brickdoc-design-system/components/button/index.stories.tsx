import React from 'react'
import { Story } from '@storybook/react'
import { Button, ButtonProps, Space, Menu, Dropdown } from '../../'
import { Search, Download } from '../icon'

export default  {
  title: 'ReactComponents/Button',
  component: Button,
  argTypes:{
    block: {
      description: 'Option to fit button width to its parent width',
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    danger: {
      description: 'Set the danger status of button',
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    disabled: {
      description: 'Disabled state of button',
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    ghost: {
      description: 'Make background transparent and invert text and border colors',
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    href: {
      description: 'Redirect url of link button',
      control: {
        type: 'text'
      },
      table: {
        type: { summary: 'string' }
      }
    },
    htmlType: {
      description: 'Set the original html type of button, see: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type)',
      defaultValue: 'button',
      control: {
        type: 'radio',
        options: ['button','reset','submit']
      },
      table: {
        type: { summary: 'string' }
      }
    },
    icon: {
      description: 'Set the icon component of button',
      table: {
        type: { summary: 'ReactNode' }
      }
    },
    loading: {
      description: 'Set the loading status of button',
      defaultValue: false,
      table: {
        type: { summary: 'boolean | { delay: number }' },
        defaultValue: { summary: false }
      }
    },
    shape: {
      description: 'Can be set button shape',
      control: {
        type: 'radio',
        options: ['circle','round', undefined]
      },
      table: {
        type: { summary: 'circle | round' }
      }
    },
    type:{
      control:{
        type: 'select',
        options: ['primary', 'ghost', 'dashed', 'link', 'text', 'default']
      },
      table: {
        type: { summary: 'string' }
      }
    },
    size: {
      description: 'Set the size of button',
      defaultValue: 'middle',
      control: {
        type: 'radio',
        options: ['large', 'middle', 'small']
      },
      table: {
        type: { summary: 'large | middle | small' }
      }
    },
    target:{
      description: 'Same as target attribute of a, works when href is specified',
      control:{
        type: 'text'
      },
      table: {
        type: { summary: 'string' }
      }
    },
    onClick:{
      description: 'Set the handler to handle `click` event',
      table:{
        type: { summary: '(event) => void'}
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
To trigger an operation.

#### When To Use
A button means an operation (or a series of operations). Clicking a button will trigger corresponding business logic.

We provide 5 types of button.

* Primary button: indicate the main action, one primary button at most in one section.
* Default button: indicate a series of actions without priority.
* Dashed button: used for adding action commonly.
* Text button: used for the most secondary action.
* Link button: used for external links.

And 4 other properties additionally.

* \`danger\`: used for actions of risk, like deletion or authorization.
* \`ghost\`: used in situations with complex background, home pages usually.
* \`disabled\`: when actions are not available.
* \`loading\`: add loading spinner in button, avoiding multiple submits too.
`
      }
    }
  }
}




const Template: Story<ButtonProps> = (args) => <Button {...args} />


export const Base = Template.bind({})

Base.args = {
  type: 'primary',
  children: 'Primary Button'
}


export const Type: Story<ButtonProps> = (_args) => (
  <Space>
    <Button type="primary">Primary Button</Button>
    <Button>Default Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button>
  </Space>
)

Type.parameters = {
  docs: {
    description: {
      story: `There are primary button, default button, dashed button, text button and link button in brick design system.`
    }
  }
}

export const Icon: Story<ButtonProps> = (_args) => (
  <Space>
    <Button type="primary" shape="circle" icon={<Search />} />
    <Button type="primary" icon={<Search />}>
      Search
    </Button>
    <Button icon={<Download />} />
    <Button  shape="circle" icon={<Download />} />
    <Button  icon={<Download />}>
      Download
    </Button>
  </Space>
)

Icon.parameters = {
  docs: {
    description: {
      story: `
\`Button\` components can contain an \`Icon\`. This is done by setting the icon property or placing an  \`Icon\`
 component within the \`Button\`.

 If you want specific control over the positioning and placement of the  \`Icon \`, then that should be done by placing the
 \`Icon\` component within the Button rather than using the  \`icon \` property.`
    }
  }
}

export const Loading: Story<ButtonProps> = (_args) => (
  <Space>
    <Button type="primary" loading>
      Loading
    </Button>
    <Button  loading>
      Doc is Loading...
    </Button>
  </Space>
)

Loading.parameters = {
  docs: {
    description: {
      story: `
A loading indicator can be added to a button by setting the \`loading\` property on the \`Button\`.`
    }
  }
}


const menu = (<Menu>
  <Menu.Item key="1">1st item</Menu.Item>
  <Menu.Item key="2">2nd item</Menu.Item>
  <Menu.Item key="3">3rd item</Menu.Item>
</Menu>)

export const MultipleButtons: Story<ButtonProps> = (_args) => (
  <Space>
    <>
      <Button type="primary">primary</Button>
      <Button>secondary</Button>
      <Dropdown.Button overlay={menu}>Actions</Dropdown.Button>
    </>
  </Space>
)

MultipleButtons.parameters = {
  docs: {
    description: {
      story: `
If you need several buttons, we recommend that you use 1 primary button + n secondary buttons, and if there are more
than three operations, you can group some of them into \`Dropdown.Button\`.`
    }
  }
}

export const BlockButton: Story<ButtonProps> = (_args) => (
  <>
    <Button type="primary" block>
      Primary
    </Button>
    <br/><br/>
    <Button block>Default</Button>
    <br/><br/>
    <Button type="dashed" block>
      Dashed
    </Button>
    <br/><br/>
    <Button type="link" block>
      Link
    </Button>
  </>
)
BlockButton.parameters = {
  docs: {
    description: {
      story: '`block` property will make the button fit to its parent width.'
    }
  }
}
