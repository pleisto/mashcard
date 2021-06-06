import React from "react"
import { Story } from "@storybook/react"
import { Popconfirm, PopconfirmProps, Space } from "../../"
export default {
  title: "ReactComponents/Popconfirm",
  component: Popconfirm,
  parameters: {
    docs: {
      description: {
        component: `
A simple and compact confirmation dialog of an action.

## When To Use

A simple and compact dialog used for asking for user confirmation.

The difference with the \`confirm\` modal dialog is that it's more lightweight than the static popped full-screen confirm modal.

## API

| Param | Description | Type | Default value |
| --- | --- | --- | --- |
| cancelButtonProps | The cancel button props | ButtonProps | - |
| cancelText | The text of the Cancel button | string | \`Cancel\` |
| disabled | Whether show popconfirm when click its childrenNode | boolean | false |
| icon | Customize icon of confirmation | ReactNode | &lt;ExclamationCircle /> |
| okButtonProps | The ok button props | ButtonProps | - |
| okText | The text of the Confirm button | string | \`OK\` |
| okType | Button \`type\` of the Confirm button | string | \`primary\` |
| title | The title of the confirmation box | ReactNode \\| () => ReactNode | - |
| onCancel | A callback of cancel | function(e) | - |
| onConfirm | A callback of confirmation | function(e) | - |

Consult Tooltip's documentation to find more APIs.

## Note

Please ensure that the child node of \`Popconfirm\` accepts \`onMouseEnter\`, \`onMouseLeave\`, \`onFocus\`, \`onClick\` events.
`
      }
    }
  }
}



const Template: Story<PopconfirmProps> = (_args) =>
  <Space>
    <Popconfirm
      title="Are you sure to delete this task?"
      okText="Yes"
      cancelText="No"
    >
      <a href="#">Delete</a>
    </Popconfirm>
  </Space>
export const Base = Template.bind({})

