import React from 'react'
import { Story } from '@storybook/react'
import { Tabs, TabsProps } from '../'
export default {
  title: 'ReactComponents/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component: `
Tabs make it easy to switch between different views.

### When To Use

Brickdoc Design System has 3 types of Tabs for different situations.

- Card Tabs: for managing too many closeable views.
- Normal Tabs: for functional aspects of a page.
- Radio.Button: for secondary tabs.

## API

### Tabs

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| activeKey | Current TabPane's key | string | - |
| addIcon | Customize add icon | ReactNode | - |
| animated | Whether to change tabs with animation. Only works while \`tabPosition="top"\` | boolean \\| { inkBar: boolean, tabPane: boolean } | { inkBar: true, tabPane: false } |
| centered | Centers tabs | boolean | false |
| defaultActiveKey | Initial active TabPane's key, if \`activeKey\` is not set | string | - |
| hideAdd | Hide plus icon or not. Only works while \`type="editable-card"\` | boolean | false |
| moreIcon | The custom icon of ellipsis | ReactNode | &lt;EllipsisOutlined /> |
| renderTabBar | Replace the TabBar | (props: DefaultTabBarProps, DefaultTabBar: React.ComponentClass) => React.ReactElement | - |
| size | Preset tab bar size | \`large\` \\| \`default\` \\| \`small\` | \`default\` |
| tabBarExtraContent | Extra content in tab bar | ReactNode \\| {left?: ReactNode, right?: ReactNode} | - |
| tabBarGutter | The gap between tabs | number | - |
| tabBarStyle | Tab bar style object | object | - |
| tabPosition | Position of tabs | \`top\` \\| \`right\` \\| \`bottom\` \\| \`left\` | \`top\` |
| type | Basic style of tabs | \`line\` \\| \`card\` \\| \`editable-card\` | \`line\` |
| onChange | Callback executed when active tab is changed | function(activeKey) {} | - |
| onEdit | Callback executed when tab is added or removed. Only works while \`type="editable-card"\` | (targetKey, action) => void | - |
| onTabClick | Callback executed when tab is clicked | function(key: string, event: MouseEvent) | - |
| onTabScroll | Trigger when tab scroll | function({ direction: \`left\` \\| \`right\` \\| \`top\` \\| \`bottom\` }) | - |

More option at [rc-tabs option](https://github.com/react-component/tabs#tabs)

### Tabs.TabPane

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| closeIcon | Customize close icon in TabPane's head. Only works while \`type="editable-card"\` | ReactNode | - |
| forceRender | Forced render of content in tabs, not lazy render after clicking on tabs | boolean | false |
| key | TabPane's key | string | - |
| tab | Show text in TabPane's head | ReactNode | - |

More option at [rc-tabs option](https://github.com/react-component/tabs#tabpane)
`
      }
    }
  }
}

const { TabPane } = Tabs

const Template: Story<TabsProps> = _args => (
  <>
    <Tabs defaultActiveKey="1">
      <TabPane tab="Tab 1" key="1">
        Content of Tab Pane 1
      </TabPane>
      <TabPane tab="Tab 2" disabled key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
    <br />
    <br />
    <Tabs type="card">
      <TabPane tab="Tab 1" key="1">
        Content of Tab Pane 1
      </TabPane>
      <TabPane tab="Tab 2" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
    <br />
    <br />
    <Tabs tabPosition="left">
      <TabPane tab="Tab 1" key="1">
        Content of Tab 1
      </TabPane>
      <TabPane tab="Tab 2" key="2">
        Content of Tab 2
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        Content of Tab 3
      </TabPane>
    </Tabs>
  </>
)
export const Base = Template.bind({})
