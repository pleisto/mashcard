import React from 'react'
import { Story } from '@storybook/react'
import { Collapse, CollapseProps } from '../'
import { Setting } from '../icon'

export default {
  title: 'ReactComponents/Collapse',
  component: Collapse,
  argTypes: {
    accordion: {
      description: 'If true, Collapse renders as Accordion',
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    activeKey: {
      description: 'Key of the active panel',
      table: {
        type: { summary: 'string[] | string | number[] | number' },
        defaultValue: { summary: "No default value. In accordion mode, it's the key of the first panel" }
      }
    },
    bordered: {
      description: 'Toggles rendering of the border around the collapse block',
      defaultValue: true,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    collapsible: {
      description: 'Specify whether the panels of children be collapsible or the trigger area of collapsible',
      table: {
        type: { summary: 'header | disabled' }
      }
    },
    defaultActiveKey: {
      description: 'Key of the initial active panel',
      table: {
        type: { summary: 'string[] | string | number[] | number' }
      }
    },
    destroyInactivePanel: {
      description: 'Destroy Inactive Panel',
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    expandIcon: {
      description: 'Allow to customize collapse icon',
      table: {
        type: { summary: '(panelProps) => ReactNode' }
      }
    },
    expandIconPosition: {
      description: 'Set expand icon position',
      control: {
        type: 'radio',
        options: ['left', 'right']
      }
    },
    ghost: {
      description: 'Make the collapse borderless and its background transparent\t',
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    onChange: {
      description: 'Callback function executed when active panel is changed',
      table: {
        type: { summary: 'function' }
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
A content area which can be collapsed and expanded.

#### When To Use

* Can be used to group or hide complex regions to keep the page clean.
* Accordion is a special kind of Collapse, which allows only one panel to be expanded at a time.

#### Collapse.Panel

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| collapsible | Specify whether the panel be collapsible or the trigger area of collapsible | \`header\` \\| \`disabled\` | - |
| extra | The extra element in the corner | ReactNode | - |
| forceRender | Forced render of content on panel, instead of lazy rending after clicking on header | boolean | false |
| header | Title of the panel | ReactNode | - |
| key | Unique key identifying the panel from among its siblings | string \\| number | - |
| showArrow | If false, panel will not show arrow icon | boolean | true |
`
      }
    }
  }
}

const { Panel } = Collapse

const text = `
  人之有德慧术知者,恒存乎疢疾。
  独孤臣孽子, 其操心也危, 其虑患也深, 故达。
`

const Template: Story<CollapseProps> = args => (
  <Collapse {...args}>
    <Panel header="This is panel header 1" key="1">
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 2" key="2">
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 3" key="3">
      <p>{text}</p>
    </Panel>
  </Collapse>
)
export const Base = Template.bind({})

export const Type: Story<CollapseProps> = _args => (
  <>
    <Collapse ghost={true}>
      <Panel header="This is panel header 1" key="1" extra={<Setting />}>
        <p>{text}</p>
      </Panel>
      <Panel header="This is panel header 2" key="2">
        <p>{text}</p>
      </Panel>
    </Collapse>
    <br />
    <br />
    <Collapse collapsible="disabled">
      <Panel header="This is panel header 1" key="1" extra={<Setting />}>
        <p>{text}</p>
      </Panel>
      <Panel header="This is panel header 2" key="2">
        <p>{text}</p>
      </Panel>
    </Collapse>
  </>
)
