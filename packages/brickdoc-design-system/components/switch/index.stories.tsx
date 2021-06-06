import React from "react"
import { Story } from "@storybook/react"
import { Switch, SwitchProps } from "../../"
export default {
  title: "ReactComponents/Switch",
  component: Switch,
  argTypes:{
    autoFocus: {
      description: 'Whether get focus when component mounted',
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },checked: {
      description: 'Determine whether the Switch is checked',
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    checkedChildren: {
      description: 'The content to be shown when the state is checked',
      table: {
        type: { summary: 'ReactNode' }
      }
    },
    className: {
      description: 'The additional class to Switch',
      table: {
        type: { summary: 'string' }
      }
    },
    defaultChecked: {
      description: 'Whether to set the initial state',
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },disabled: {
      description: 'Disable switch',
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },loading: {
      description: 'Loading state of switch',
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    size: {
      description: 'The size of the Switch',
      defaultValue: 'default',
      control: {
        type: 'radio',
        options: ['default', 'small']
      },
      table: {
        type: { summary: 'default | small' }
      }
    },
    unCheckedChildren: {
      description: 'The content to be shown when the state is unchecked',
      table: {
        type: { summary: 'ReactNode' }
      }
    },
    onChange: {
      description: 'Trigger when the checked state is changing',
      table: {
        type: { summary: 'function(checked: boolean, event: Event)' }
      }
    },
    onClick: {
      description: 'Trigger when clicked',
      table: {
        type: { summary: 'function(checked: boolean, event: Event)' }
      }
    },
  },
  parameters: {
    docs: {
      description: {
        component: `

Switching Selector.

## When To Use

- If you need to represent the switching between two states or on-off state.
- The difference between \`Switch\` and \`Checkbox\` is that \`Switch\` will trigger a state change directly when you toggle it, while \`Checkbox\` is generally used for state marking, which should work in conjunction with submit operation.


## Methods

| Name | Description |
| --- | --- |
| blur() | Remove focus |
| focus() | Get focus |
`
      }
    }
  }
}



const Template: Story<SwitchProps> = (args) =>
  <>
    <Switch {...args} />
  </>
export const Base = Template.bind({})

