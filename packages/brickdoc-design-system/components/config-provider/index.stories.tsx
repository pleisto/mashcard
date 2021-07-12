import React from 'react'
import { Story } from '@storybook/react'
import { ConfigProvider, ConfigProviderProps } from '../'
export default {
  title: 'ReactComponents/ConfigProvider',
  component: ConfigProvider,
  parameters: {
    docs: {
      description: {
        component: `
ConfigProvider provides a uniform configuration support for components.

This component provides a configuration to all React components underneath itself via the [context API](https://facebook.github.io/react/docs/context.html). In the render tree all components will have access to the provided config.

\`\`\`jsx
import { ConfigProvider } from 'antd';

// ...

export default () => (
  <ConfigProvider direction="rtl">
    <App />
  </ConfigProvider>
);
\`\`\`

### Content Security Policy

Some components use dynamic style to support wave effect. You can config \`csp\` prop if Content Security Policy (CSP) is enabled:

\`\`\`jsx
<ConfigProvider csp={{ nonce: 'YourNonceCode' }}>
  <Button>My Button</Button>
</ConfigProvider>
\`\`\`

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| autoInsertSpaceInButton | Set false to remove space between 2 chinese characters on Button | boolean | true |
| componentSize | Config antd component size | \`small\` \\| \`middle\` \\| \`large\` | - |
| csp | Set [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) config | { nonce: string } | - |
| direction | Set direction of layout. | \`ltr\` \\| \`rtl\` | \`ltr\` |
| dropdownMatchSelectWidth | Determine whether the dropdown menu and the select input are the same width. Default set \`min-width\` same as input. Will ignore when value less than select width. \`false\` will disable virtual scroll | boolean \\| number | - |
| form | Set Form common props | { validateMessages?: ValidateMessages, requiredMark?: boolean \\| \`optional\` } | - |
| getPopupContainer | To set the container of the popup element. The default is to create a \`div\` element in \`body\` | function(triggerNode) | () => document.body |
| getTargetContainer | Config Affix, Anchor scroll target container | () => HTMLElement | () => window |
| iconPrefixCls | Set icon prefix className (cooperated with @iconfont-css-prefix) | string | \`anticon\` |
| input | Set Input common props | { autoComplete?: string } | - |
| locale | Language package setting, you can find the packages in components/locale| object | - |
| pageHeader | Unify the ghost of PageHeader, ref PageHeader | { ghost: boolean } | true |
| prefixCls | Set prefix className (cooperated with @brk-prefix) | string | \`ant\` |
| renderEmpty | Set empty content of components. Ref Empty | function(componentName: string): ReactNode | - |
| space | Set Space \`size\`, ref [Space | { size: \`small\` \\| \`middle\` \\| \`large\` \\| \`number\` } | - |
| virtual | Disable virtual scroll when set to \`false\` | boolean | - |

### ConfigProvider.config()

Setting \`Modal\`、\`Message\`、\`Notification\` rootPrefixCls.

\`\`\`jsx
ConfigProvider.config({
  prefixCls: 'brk',
});
\`\`\`
`
      }
    }
  }
}

const Template: Story<ConfigProviderProps> = args => <ConfigProvider {...args} />
export const Base = Template.bind({})
