import { Select } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Select',
  component: Select,
  args: {
    bordered: true,
    disabled: false,
    loading: false,
    virtual: true
  },
  argTypes: {
    allowClear: {
      control: 'boolean',
      description: 'Show clear button'
    },
    autoClearSearchValue: {
      control: 'boolean',
      description: 'Whether the current search will be cleared on selecting an item.'
    },
    autoFocus: {
      control: 'boolean',
      description: 'Whether to auto focus the component'
    },
    bordered: {
      control: 'boolean',
      description: 'Whether to show border'
    },
    clearIcon: {
      description: '`ReactNode` The custom clear icon'
    },
    defaultActiveFirstOption: {
      control: 'boolean',
      description: 'Whether to select the first option by default'
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Whether to open the select by default'
    },
    defaultValue: {
      description: 'Initial selected option'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether to disable the select'
    },
    dropdownClassName: {
      description: 'The class name of the dropdown menu'
    },
    dropdownMatchSelectWidth: {
      description:
        'Determine whether the dropdown menu and the select input are the same width. Default set min-width same as input. Will ignore when value less than select width. false will disable virtual scroll'
    },
    dropdownRender: {
      description: '`(originNode: ReactNode) => ReactNode`  The custom dropdown menu'
    },
    dropdownStyle: {
      description: 'The style of the dropdown menu'
    },
    fieldNames: {
      description: 'Customize node label, value, options field name'
    },
    filterOption: {
      description:
        'If true, filter options by input, if function, filter options against it. The function will receive two arguments, inputValue and option, if the function returns true, the option will be included in the filtered set; Otherwise, it will be excluded'
    },
    filterSort: {
      description:
        "`(optionA: Option, optionB: Option) => number	` Sort function for search options sorting, see Array.sort's compareFunction"
    },
    getPopupContainer: {
      description: 'The container of the dropdown menu. default is `() => document.body`'
    },
    labelInValue: {
      description:
        'Whether to embed label in value, turn the format of value from string to { value: string, label: ReactNode }',
      control: 'boolean'
    },
    listHeight: {
      description: 'Config popup height',
      control: 'number'
    },
    loading: {
      description: 'Whether to show loading',
      control: 'boolean'
    },
    maxTagCount: {
      description: 'Max tag count to show'
    },
    maxTagPlaceholder: {
      description: 'Placeholder for not showing tags'
    },
    maxTagTextLength: {
      description: 'Max tag text length to show'
    },
    menuItemSelectedIcon: {
      description: '`ReactNode` The custom selected icon'
    },
    mode: {
      description: 'Select mode',
      control: {
        type: 'radio',
        options: ['combobox', 'multiple', 'tags']
      }
    },
    notFoundContent: {
      description: 'Not found content'
    },
    open: {
      description: 'Controlled open state of dropdown	'
    },
    optionFilterProp: {
      description:
        'Which prop value of option will be used for filter if filterOption is true. If options is set, it should be set to label'
    },
    optionLabelProp: {
      description: 'Which prop value of option will render as content of select.'
    },
    options: {
      description: '`{ label, value }[]` | The options of select'
    },
    placeholder: {
      description: 'Placeholder of select'
    },
    removeIcon: {
      description: '`ReactNode` The custom remove icon'
    },
    searchValue: {
      description: 'The current input "search" text'
    },
    showArrow: {
      description: 'Whether to show the drop-down arrow',
      control: 'boolean'
    },
    showSearch: {
      description: 'Whether to show search input',
      control: 'boolean'
    },
    tagRender: {
      description: '`(props) => ReactNode` The custom tag render'
    },
    tokenSeparators: {
      description: 'Separators of tags'
    },
    value: {
      description: 'Current selected option (considered as a immutable array)	'
    },
    virtual: {
      description: 'Whether to use virtual scroll',
      control: 'boolean'
    },
    onBlur: {
      description: 'Called when the component is blurred'
    },
    onChange: {
      description: 'Called when the value is changed'
    },
    onClear: {
      description: 'Called when the clear'
    },
    onDeselect: {
      description: 'Called when the option is deselected'
    },
    onDropdownVisibleChange: {
      description: 'Called when the dropdown is visible changed'
    },
    onFocus: {
      description: 'Called when the component is focused'
    },
    onInputKeyDown: {
      description: 'Called when the input is keydown'
    },
    onMouseEnter: {
      description: 'Called when the mouse enters the component'
    },
    onMouseLeave: {
      description: 'Called when the mouse leaves the component'
    },
    onPopupScroll: {
      description: 'Called when the popup is scrolled'
    },
    onSearch: {
      description: 'Called when the search'
    },
    onSelect: {
      description: 'Called when the option is selected'
    }
  },

  parameters: {
    docs: {
      description: {
        component: `

## When To Use

- A dropdown menu for displaying choices - an elegant alternative to the native \`<select>\` element.

## API

### Select Methods

- \`blur()\`: Remove focus
- \`focus()\`: Get focus

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

## More Information
See [\`rc-select\`](https://github.com/react-component/select/)
`
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/YcVOEbdec2oqyKrYFSkeYW/Components-Base?node-id=1373%3A4886'
    }
  }
} as ComponentMeta<typeof Select>

const { Option } = Select

const Template: ComponentStory<typeof Select> = () => (
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
    <Select
      mode="multiple"
      style={{ width: '100%' }}
      placeholder="select one country"
      defaultValue={['china']}
      optionLabelProp="label"
    >
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
  </>
)
export const Base = Template.bind({})
