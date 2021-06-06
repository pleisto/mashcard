import React from "react"
import { Story } from "@storybook/react"
import { Popover, PopoverProps, Space, Button } from "../../"
export default {
  title: "ReactComponents/Popover",
  component: Popover,
  argTypes: {
    content: {
      description: "Content of the card",
      table: {
        type: { summary: "ReactNode || () => ReactNode" }
      }
    },
    title: {
      description: "Title of the card",
      table: {
        type: { summary: "ReactNode || () => ReactNode" }
      }
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
The floating card popped by clicking or hovering.

## When To Use

A simple popup menu to provide extra information or operations.

Comparing with \`Tooltip\`, besides information \`Popover\` card can also provide action elements like links and buttons.

## API

Consult Tooltip's documentation to find more APIs.

## Note

Please ensure that the child node of \`Popover\` accepts \`onMouseEnter\`, \`onMouseLeave\`, \`onFocus\`, \`onClick\` events.
`
      }
    }
  }
}

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
)

const Template: Story<PopoverProps> = (args) =>
  <Space>
    <Popover {...args}>
      <Button type="primary">Hover me</Button>
    </Popover>
  </Space>
export const Base = Template.bind({})
Base.args = {
  content,
  title: 'Hello World'
}
