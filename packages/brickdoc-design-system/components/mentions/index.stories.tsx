import React from "react"
import { Story } from "@storybook/react"
import { Mentions, MentionsProps } from "../../"

export default {
  title: "ReactComponents/Mentions",
  component: Mentions,
  parameters: {
  docs: {
    description: {
      component: `
Mention component.

#### When To Use

When need to mention someone or something.

#### API

\`\`\`jsx
<Mentions onChange={onChange}>
  <Mentions.Option value="sample">Sample</Mentions.Option>
</Mentions>
\`\`\`

##### Mention

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| autoFocus | Auto get focus when component mounted | boolean | false |
| autoSize | Textarea height autosize feature, can be set to true \\| false or an object { minRows: 2, maxRows: 6 } | boolean \\| object | false |
| defaultValue | Default value | string | - |
| filterOption | Customize filter option logic | false \\| (input: string, option: OptionProps) => boolean | - |
| getPopupContainer | Set the mount HTML node for suggestions | () => HTMLElement | - |
| notFoundContent | Set mentions content when not match | ReactNode | \`Not Found\` |
| placement | Set popup placement | \`top\` \\| \`bottom\` | \`bottom\` |
| prefix | Set trigger prefix keyword | string \\| string\\[] | \`@\` |
| split | Set split string before and after selected mention | string | \` \` |
| validateSearch | Customize trigger search logic | (text: string, props: MentionsProps) => void | - |
| value | Set value of mentions | string | - |
| onBlur | Trigger when mentions lose focus | () => void | - |
| onChange | Trigger when value changed | (text: string) => void | - |
| onFocus | Trigger when mentions get focus | () => void | - |
| onResize | The callback function that is triggered when textarea resize | function({ width, height }) | - |
| onSearch | Trigger when prefix hit | (text: string, prefix: string) => void | - |
| onSelect | Trigger when user select the option | (option: OptionProps, prefix: string) => void | - |

#### Mention methods

| Name | Description |
| --- | --- |
| blur() | Remove focus |
| focus() | Get focus |

#### Option

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| children | Suggestion content | ReactNode | - |
| value | The value of suggestion, the value will insert into input filed while selected | string | - |
`
    }
  }
}
}


const { Option } = Mentions

const Template: Story<MentionsProps> = (_args) =>
  <>
    <Mentions
      style={{ width: '100%' }}
      defaultValue="@boris"
    >
      <Option value="boris">Boris Ding</Option>
      <Option value="ror">Ruby on Rails</Option>
      <Option value="antd">Brickdoc Design System</Option>
    </Mentions>
  </>
export const Base = Template.bind({})




