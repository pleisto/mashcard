import React from "react"
import { Story } from "@storybook/react"
import { message, MessageProps, Button, Space } from "../../"

export default {
  title: "ReactComponents/Message",
  component: message,
  parameters: {
  docs: {
    description: {
      component: `
Display global messages as feedback in response to user operations.

## When To Use

- To provide feedback such as success, warning, error etc.
- A message is displayed at top and center and will be dismissed automatically, as a non-interrupting light-weighted prompt.

## API

This components provides some static methods, with usage and arguments as following:

- \`message.success(content, [duration], onClose)\`
- \`message.error(content, [duration], onClose)\`
- \`message.info(content, [duration], onClose)\`
- \`message.warning(content, [duration], onClose)\`
- \`message.warn(content, [duration], onClose)\` // alias of warning
- \`message.loading(content, [duration], onClose)\`

| Argument | Description | Type | Default |
| --- | --- | --- | --- |
| content | The content of the message | ReactNode \\| config | - |
| duration | Time(seconds) before auto-dismiss, don't dismiss if set to 0 | number | 1.5 |
| onClose | Specify a function that will be called when the message is closed | function | - |

\`afterClose\` can be called in thenable interface:

- \`message[level](content, [duration]).then(afterClose)\`
- \`message[level](content, [duration], onClose).then(afterClose)\`

where \`level\` refers one static methods of \`message\`. The result of \`then\` method will be a Promise.

Supports passing parameters wrapped in an object:

- \`message.open(config)\`
- \`message.success(config)\`
- \`message.error(config)\`
- \`message.info(config)\`
- \`message.warning(config)\`
- \`message.warn(config)\` // alias of warning
- \`message.loading(config)\`

The properties of config are as follows:

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| className | Customized CSS class | string | - |
| content | The content of the message | ReactNode | - |
| duration | Time(seconds) before auto-dismiss, don't dismiss if set to 0 | number | 3 |
| icon | Customized Icon | ReactNode | - |
| key | The unique identifier of the Message | string \\| number | - |
| style | Customized inline style | [CSSProperties](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/e434515761b36830c3e58a970abf5186f005adac/types/react/index.d.ts#L794) | - |
| onClick | Specify a function that will be called when the message is clicked | function | - |
| onClose | Specify a function that will be called when the message is closed | function | - |

### Global static methods

Methods for global configuration and destruction are also provided:

- \`message.config(options)\`
- \`message.destroy()\`

> use \`message.destroy(key)\` to remove a message。

#### message.config

> When you use \`ConfigProvider\` for global configuration, the system will automatically start RTL mode by default.(4.3.0+)
>
> When you want to use it alone, you can start the RTL mode through the following settings.

\`\`\`js
message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
  rtl: true,
  prefixCls: 'my-message',
});
\`\`\`

| Argument | Description | Type | Default |
| --- | --- | --- | --- |
| duration | Time before auto-dismiss, in seconds | number | 1.5 |
| getContainer | Return the mount node for Message | () => HTMLElement | () => document.body |
| maxCount | Max message show, drop oldest if exceed limit | number | - |
| prefixCls | The prefix className of message node | string | \`ant-message\` |
| rtl | Whether to enable RTL mode | boolean | false |
| top | Distance from top | number | 24 |
`
    }
  }
}
}



const info = () => {
  message.info('This is a normal message')
}
const success = () => {
  message.success('This is a success message')
}

const error = () => {
  message.error('This is an error message')
}

const warning = () => {
  message.warning('This is a warning message')
}

const loading = () => {
  const hide = message.loading('Action in progress..', 0)
  // Dismiss manually and asynchronously
  setTimeout(hide, 2500)
}
const Template: Story<MessageProps> = (_args) =>
  <Space>
    <Button type="primary" onClick={info}>
      Display normal message
    </Button>
    <Button onClick={success}>Success</Button>
    <Button onClick={error}>Error</Button>
    <Button onClick={warning}>Warning</Button>
    <Button onClick={loading}>Loading</Button>

  </Space>
export const Base = Template.bind({})

