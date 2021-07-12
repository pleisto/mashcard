import React from 'react'
import { Story } from '@storybook/react'
import { Select, Tag } from '../'
export default {
  title: 'ReactComponents/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: `
Select component to select value from options.

## When To Use

- A dropdown menu for displaying choices - an elegant alternative to the native \`<select>\` element.
- Utilizing [Radio](/components/radio/) is recommended when there are fewer total options (less than 5).

## API

\`\`\`jsx
<Select>
  <Option value="lucy">lucy</Option>
</Select>
\`\`\`

### Select props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| allowClear | Show clear button | boolean | false |
| autoClearSearchValue | Whether the current search will be cleared on selecting an item. Only applies when \`mode\` is set to \`multiple\` or \`tags\` | boolean | true |
| autoFocus | Get focus by default | boolean | false |
| bordered | Whether has border style | boolean | true |
| clearIcon | The custom clear icon | ReactNode | - |
| defaultActiveFirstOption | Whether active first option by default | boolean | true |
| defaultOpen | Initial open state of dropdown | boolean | - |
| defaultValue | Initial selected option | string \\| string\\[]<br />number \\| number\\[]<br />LabeledValue \\| LabeledValue\\[] | - |
| disabled | Whether disabled select | boolean | false |
| dropdownClassName | The className of dropdown menu | string | - |
| dropdownMatchSelectWidth | Determine whether the dropdown menu and the select input are the same width. Default set \`min-width\` same as input. Will ignore when value less than select width. \`false\` will disable virtual scroll | boolean \\| number | true |
| dropdownRender | Customize dropdown content | (originNode: ReactNode) => ReactNode | - |
| dropdownStyle | The style of dropdown menu | CSSProperties | - |
| filterOption | If true, filter options by input, if function, filter options against it. The function will receive two arguments, \`inputValue\` and \`option\`, if the function returns \`true\`, the option will be included in the filtered set; Otherwise, it will be excluded | boolean \\| function(inputValue, option) | true |
| filterSort | Sort function for search options sorting, see [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)'s compareFunction | (optionA: Option, optionB: Option) => number | - |
| getPopupContainer | Parent Node which the selector should be rendered to. Default to \`body\`. When position issues happen, try to modify it into scrollable content and position it relative. [Example](https://codesandbox.io/s/4j168r7jw0) | function(triggerNode) | () => document.body |
| labelInValue | Whether to embed label in value, turn the format of value from \`string\` to { value: string, label: ReactNode } | boolean | false |
| listHeight | Config popup height | number | 256 |
| loading | Indicate loading state | boolean | false |
| maxTagCount | Max tag count to show. \`responsive\` will cost render performance | number \\| \`responsive\` | - |
| maxTagPlaceholder | Placeholder for not showing tags | ReactNode \\| function(omittedValues) | - |
| maxTagTextLength | Max tag text length to show | number | - |
| menuItemSelectedIcon | The custom menuItemSelected icon with multiple options | ReactNode | - |
| mode | Set mode of Select | \`multiple\` \\| \`tags\` | - |
| notFoundContent | Specify content to show when no result matches | ReactNode | \`Not Found\` |
| open | Controlled open state of dropdown | boolean | - |
| optionFilterProp | Which prop value of option will be used for filter if filterOption is true. If \`options\` is set, it should be set to \`label\` | string | \`value\` |
| optionLabelProp | Which prop value of option will render as content of select. [Example](https://codesandbox.io/s/antd-reproduction-template-tk678) | string | \`children\` |
| options | Select options. Will get better perf than jsx definition | { label, value }\\[] | - |
| placeholder | Placeholder of select | ReactNode | - |
| removeIcon | The custom remove icon | ReactNode | - |
| searchValue | The current input "search" text | string | - |
| showArrow | Whether to show the drop-down arrow | boolean | true(for single select), false(for multiple select) |
| showSearch | Whether show search input in single mode | boolean | false |
| size | Size of Select input | \`large\` \\| \`middle\` \\| \`small\` | \`middle\` |
| suffixIcon | The custom suffix icon | ReactNode | - |
| tagRender | Customize tag render | (props) => ReactNode | - |
| tokenSeparators | Separator used to tokenize on \`tag\` and \`multiple\` mode | string\\[] | - |
| value | Current selected option | string \\| string\\[]<br />number \\| number\\[]<br />LabeledValue \\| LabeledValue\\[] | - |
| virtual | Disable virtual scroll when set to false | boolean | true |
| onBlur | Called when blur | function | - |
| onChange | Called when select an option or input value change | function(value, option:Option \\| Array&lt;Option>) | - |
| onClear | Called when clear | function | - |
| onDeselect | Called when an option is deselected, param is the selected option's value. Only called for \`multiple\` or \`tags\`, effective in multiple or tags mode only | function(string \\| number \\| LabeledValue) | - |
| onDropdownVisibleChange | Called when dropdown open | function(open) | - |
| onFocus | Called when focus | function | - |
| onInputKeyDown | Called when key pressed | function | - |
| onMouseEnter | Called when mouse enter | function | - |
| onMouseLeave | Called when mouse leave | function | - |
| onPopupScroll | Called when dropdown scrolls | function | - |
| onSearch | Callback function that is fired when input changed | function(value: string) | - |
| onSelect | Called when an option is selected, the params are option's value (or key) and option instance | function(string \\| number \\| LabeledValue, option: Option) | - |

> Note, if you find that the drop-down menu scrolls with the page, or you need to trigger Select in other popup layers, please try to use \`getPopupContainer={triggerNode => triggerNode.parentElement}\` to fix the drop-down popup rendering node in the parent element of the trigger .

### Select Methods

| Name | Description | Version |
| --- | --- | --- |
| blur() | Remove focus |  |
| focus() | Get focus |  |

### Option props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| className | The additional class to option | string | - |
| disabled | Disable this option | boolean | false |
| title | \`title\` of Select after select this Option | string | - |
| value | Default to filter with this property | string \\| number | - |

### OptGroup props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| key | Group key | string | - |
| label | Group label | string \\| React.Element | - |
`
      }
    }
  }
}

const { Option } = Select

function tagRender(props) {
  const { label, value, closable, onClose } = props
  const onPreventMouseDown = event => {
    event.preventDefault()
    event.stopPropagation()
  }
  return (
    <Tag color={value} onMouseDown={onPreventMouseDown} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
      {label}
    </Tag>
  )
}

const Template: Story = () => (
  <>
    <Select defaultValue="ruby" style={{ width: 120 }}>
      <Option value="ruby">Ruby</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="jack">Jack</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
    </Select>
    <br />
    <br />
    <Select mode="multiple" style={{ width: '100%' }} placeholder="select one country" defaultValue={['china']} optionLabelProp="label">
      <Option value="china" label="China">
        <div className="demo-option-label-item">
          <span role="img" aria-label="China">
            🇨🇳
          </span>
          China (中国)
        </div>
      </Option>
      <Option value="usa" label="USA">
        <div className="demo-option-label-item">
          <span role="img" aria-label="USA">
            🇺🇸
          </span>
          USA (美国)
        </div>
      </Option>
      <Option value="japan" label="Japan">
        <div className="demo-option-label-item">
          <span role="img" aria-label="Japan">
            🇯🇵
          </span>
          Japan (日本)
        </div>
      </Option>
      <Option value="korea" label="Korea">
        <div className="demo-option-label-item">
          <span role="img" aria-label="Korea">
            🇰🇷
          </span>
          Korea (韩国)
        </div>
      </Option>
    </Select>
    <br />
    <br />
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Select a person"
      optionFilterProp="children"
      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="tom">Tom</Option>
    </Select>
    <br />
    <br />
    <Select
      mode="multiple"
      showArrow
      tagRender={tagRender}
      defaultValue={['gold', 'cyan']}
      style={{ width: '100%' }}
      options={[{ value: 'gold' }, { value: 'lime' }, { value: 'green' }, { value: 'cyan' }]}
    />
  </>
)
export const Base = Template.bind({})
