import React from 'react'
import { Story } from '@storybook/react'
import { notification, Space, Button } from '../'
export default {
  title: 'ReactComponents/Notification',
  component: notification,
  parameters: {
    docs: {
      description: {
        component: `
Display a notification message globally.

## When To Use

To display a notification message at any of the four corners of the viewport. Typically it can be used in the following cases:

- A notification with complex content.
- A notification providing a feedback based on the user interaction. Or it may show some details about upcoming steps the user may have to follow.
- A notification that is pushed by the application.

## API

- \`notification.success(config)\`
- \`notification.error(config)\`
- \`notification.info(config)\`
- \`notification.warning(config)\`
- \`notification.warn(config)\`
- \`notification.open(config)\`
- \`notification.close(key: String)\`
- \`notification.destroy()\`

The properties of config are as follows:

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| bottom | Distance from the bottom of the viewport, when \`placement\` is \`bottomRight\` or \`bottomLeft\` (unit: pixels) | number | 24 |
| btn | Customized close button | ReactNode | - |
| className | Customized CSS class | string | - |
| closeIcon | Custom close icon | ReactNode | - |
| description | The content of notification box (required) | ReactNode | - |
| duration | Time in seconds before Notification is closed. When set to 0 or null, it will never be closed automatically | number | 4.5 |
| getContainer | Return the mount node for Notification | () => HTMLNode | () => document.body |
| icon | Customized icon | ReactNode | - |
| key | The unique identifier of the Notification | string | - |
| message | The title of notification box (required) | ReactNode | - |
| placement | Position of Notification, can be one of \`topLeft\` \`topRight\` \`bottomLeft\` \`bottomRight\` | string | \`topRight\` |
| style | Customized inline style | [CSSProperties](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/e434515761b36830c3e58a970abf5186f005adac/types/react/index.d.ts#L794) | - |
| top | Distance from the top of the viewport, when \`placement\` is \`topRight\` or \`topLeft\` (unit: pixels) | number | 24 |
| onClick | Specify a function that will be called when the notification is clicked | function | - |
| onClose | Trigger when notification closed | function | - |

\`notification\` also provides a global \`config()\` method that can be used for specifying the default options. Once this method is used, all the notification boxes will take into account these globally defined options when displaying.

- \`notification.config(options)\`

  > When you use \`ConfigProvider\` for global configuration, the system will automatically start RTL mode by default.(4.3.0+)
  >
  > When you want to use it alone, you can start the RTL mode through the following settings.

\`\`\`js
notification.config({
  placement: 'bottomRight',
  bottom: 50,
  duration: 3,
  rtl: true,
});
\`\`\`

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| bottom | Distance from the bottom of the viewport, when \`placement\` is \`bottomRight\` or \`bottomLeft\` (unit: pixels) | number | 24 |
| closeIcon | Custom close icon | ReactNode | - |
| duration | Time in seconds before Notification is closed. When set to 0 or null, it will never be closed automatically | number | 4.5 |
| getContainer | Return the mount node for Notification | () => HTMLNode | () => document.body |
| placement | Position of Notification, can be one of \`topLeft\` \`topRight\` \`bottomLeft\` \`bottomRight\` | string | \`topRight\` |
| rtl | Whether to enable RTL mode | boolean | false |
| top | Distance from the top of the viewport, when \`placement\` is \`topRight\` or \`topLeft\` (unit: pixels) | number | 24 |
`
      }
    }
  }
}

const openNotificationWithIcon = type => {
  notification[type]({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
  })
}
const Template: Story = () => (
  <Space>
    <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
    <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
    <Button onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
    <Button onClick={() => openNotificationWithIcon('error')}>Error</Button>
  </Space>
)
export const Base = Template.bind({})
