import React from "react"
import { Story } from "@storybook/react"
import { Badge, BadgeProps, Space, Card } from "../../"
import { Alarm, Message } from '../icon'

export default {
  title: "ReactComponents/Badge",
  component: Badge,
  argTypes: {
    color: {
      description: 'Customize Badge dot color',
      control: {
        type: 'text'
      },
      table: {
        type: { summary: 'string' }
      }
    },
    count: {
      description: "Number to show in badge",
      control: {
        type: "number"
      },
      table: {
        type: { summary: "number | ReactNode" }
      }
    },
    dot: {
      description: "Whether to display a red dot instead of count",
      defaultValue: false,
      control: {
        type: "boolean"
      },
      table: {
        type: { summary: "boolean" },
        defaultValue: {summary: 'false'}
      }
    },
    offset: {
      description: "Set offset of the badge dot",
      table: {
        type: { summary: "[number, number]" }
      }
    },
    overflowCount: {
      description: "Max count to show",
      defaultValue: 99,
      control: {
        type: "number"
      },
      table: {
        type: { summary: "number" }
      }
    },
    showZero: {
      description: 'Whether to show badge when count is zero',
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary:'boolean'},
        defaultValue: { summary:'false'}
      }
    },
    size: {
      description: "If count is set, size sets the size of badge",
      control: {
        type: 'radio',
        options: ['default','small']
      }
    },
    status: {
      description: "If count is set, size sets the size of badge",
      control: {
        type: 'select',
        options: ['success','processing','default','error','warning', undefined]
      }
    },
    text: {
    description: "If status is set, text sets the display text of the status dot",
    table: {
      type: { summary: "ReactNode" }
    }
  },
    title: {
      description: 'Text to show when hovering over the badge',
      control: {
        type: 'text'
      },
      table: {
        type: { summary: 'string' }
      }
    },
}, parameters: {
  docs: {
    description: {
      component: `
Small numerical value or status descriptor for UI elements.

#### When To Use
Badge normally appears in proximity to notifications or user avatars with eye-catching appeal,
typically displaying unread messages count.
      `
    }
  }
}
}


const Template: Story<BadgeProps> = (args) =>   <Badge {...args} >
  <a href="#" style={{
    width: 40, height: 40,
    background: '#eee',
    borderRadius: '2px',
    display: 'inline-block',
    verticalAlign: 'middle'
  }} />

</Badge>


export const Base = Template.bind({})
Base.args = {count:5}


export const Standalone: Story<BadgeProps> = (_args) => (
  <Space>
    <Badge count={25} />
    <Badge count={<Alarm style={{color:'#f4532a'}} />} />
    <Badge count={999} style={{background:'#62c410'}} />
    <Badge dot><Message size={21} /></Badge>
    <Badge dot>Something</Badge>
  </Space>
)

Standalone.parameters = {
  docs: {
    description: {
      story: `Used in standalone when children is empty.`
    }
  }
}

export const Status: Story<BadgeProps> = (_args) => (
  <Space>
    <Badge status="success" text="Success" />
    <br />
    <Badge status="error" text="Error" />
    <br />
    <Badge status="default" text="Default" />
    <br />
    <Badge status="processing" text="Processing" />
    <br />
    <Badge status="warning" text="Warning" />
  </Space>
)

Status.parameters = {
  docs: {
    description: {
      story: `Standalone badge with status.`
    }
  }
}

export const Ribbon: Story<BadgeProps> = (_args) => (
  <>
    <Badge.Ribbon text="TBBT">
      <Card>Smart is the New Sexy.</Card>
    </Badge.Ribbon>
    <br/><br/>
    <Badge.Ribbon text="Something" color="#f4532a" placement="start">
      <Card>Smart is the New Sexy.</Card>
    </Badge.Ribbon>
  </>
)

Ribbon.parameters = {
  docs: {
    description: {
      story: `
Use ribbon badge.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| color | Customize Ribbon color | string | - |
| placement | The placement of the Ribbon, \`start\` and \`end\` follow text direction (RTL or LTR) | \`start\` \\| \`end\` | \`end\` |
| text | Content inside the Ribbon | ReactNode | - |
`
    }
  }
}
