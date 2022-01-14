import { Select } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Select',
  component: Select,
  args: {},
  argTypes: {
    defaultInputValue: {
      control: 'string'
    },
    defaultMenuIsOpen: {
      control: 'boolean'
    },
    defaultValue: {
      description: '`One of<null,Option,ReadonlyArray<...>>`'
    },
    form: {
      description: 'Sets the form attribute on the input'
    },
    autoFocus: {
      description: 'Focus the control when it is mounted',
      control: 'boolean'
    },
    backspaceRemovesValue: {
      description:
        'Remove the currently focused option when the user presses backspace when Select isClearable or isMulti',
      control: 'boolean'
    },
    blurInputOnSelect: {
      description:
        'Remove focus from the input when the user selects an option (handy for dismissing the keyboard on touch devices)',
      control: 'boolean'
    },
    captureMenuScroll: {
      description: 'When the user reaches the top/bottom of the menu, prevent scroll on the scroll-parent',
      control: 'boolean'
    },
    className: {
      description: 'Sets a className attribute on the outer component'
    },
    closeMenuOnSelect: {
      description: 'Close the select menu when the user selects an option',
      control: 'boolean'
    },
    closeMenuOnScroll: {
      description: `
      If true, close the select menu when the user scrolls the document/body.
      If a function, takes a standard javascript ScrollEvent you return a boolean:
      \`\`\`
      true => The menu closes
      false => The menu stays open
      \`\`\`
      This is useful when you have a scrollable modal and want to portal the menu out,
      but want to avoid graphical issues.
      `
    },
    components: {
      description: 'see the [components docs](https://react-select.com/components)'
    },
    controlShouldRenderValue: {
      description: 'Whether the value of the select, e.g. SingleValue, should be displayed in the control.',
      control: 'boolean'
    },
    delimiter: {
      description: 'Delimiter used to join multiple values into a single HTML Input value'
    },
    escapeClearsValue: {
      description: 'Clear all values when the user presses escape AND the menu is closed'
    },
    filterOption: {
      description: 'Custom method to filter whether an option should be displayed in the menu'
    },
    formatGroupLabel: {
      description: 'Formats group labels in the menu as React components'
    },
    formatOptionLabel: {
      description: 'Formats option labels in the menu and control as React components'
    },
    getOptionLabel: {
      description: '`(...) => string`'
    },
    getOptionValue: {
      description: '`(...) => string`'
    },
    hideSelectedOptions: {
      description: 'Hide the selected option from the menu',
      control: 'boolean'
    },
    id: {
      description: 'The id to set on the SelectContainer component.'
    },
    inputId: {
      description: 'The id of the search input'
    },
    instanceId: {
      description: ' `String[]|Number[]` Define an id prefix for the select components e.g. {your-id}-value'
    },
    clearable: {
      description: 'Is the select value clearable',
      control: 'boolean'
    },
    disabled: {
      description: 'Is the select disabled',
      control: 'boolean'
    },
    loading: {
      description: 'Is the select in a state of loading (async)',
      control: 'boolean'
    },
    hasValue: {
      control: 'boolean'
    },
    multi: {
      description: 'Support multiple selected options',
      control: 'boolean'
    },
    rtl: {
      description: 'Is the select direction right-to-left',
      control: 'boolean'
    },
    loadingMessage: {
      description: 'Async: Text to display when loading options'
    },
    minMenuHeight: {
      description: 'Minimum height of the menu before flipping',
      control: 'number'
    },
    maxMenuHeight: {
      description: 'Maximum height of the menu before scrolling',
      control: 'number'
    },
    menuPlacement: {
      description:
        "Default placement of the menu in relation to the control. `auto` will flip when there isn't enough space below the control.",
      options: ['bottom', 'auto', 'top'],
      control: {
        type: 'radio'
      }
    },
    menuPosition: {
      description: 'The CSS position value of the menu, when "fixed" extra layout management is required',
      options: ['absolute', 'fixed'],
      control: {
        type: 'radio'
      }
    },
    menuPortalTarget: {
      description: 'Whether the menu should use a portal, and where it should attach'
    },
    menuShouldBlockScroll: {
      description: 'Whether to block scroll events when the menu is open',
      control: 'boolean'
    },
    menuShouldScrollIntoView: {
      description: 'Whether the menu should be scrolled into view when it opens',
      control: 'boolean'
    },
    name: {
      description: 'Name of the HTML Input (optional - without this, no input will be rendered)'
    },
    noOptionsMessage: {
      description: 'Text to display when there are no options `()=>void`'
    },
    onBlur: {
      description: 'Handle focus events on the control'
    },
    onFocus: {
      description: 'Handle focus events on the control'
    },
    onKeyDown: {
      description: 'Handle key down events on the select'
    },
    onMenuScrollToTop: {
      description: 'Fired when the user scrolls to the top of the menu'
    },
    onMenuScrollToBottom: {
      description: 'Fired when the user scrolls to the bottom of the menu'
    },
    openMenuOnFocus: {
      description: 'Allows control of whether the menu is opened when the Select is focused',
      control: 'boolean'
    },
    openMenuOnClick: {
      description: 'Allows control of whether the menu is opened when the Select is clicked',
      control: 'boolean'
    },
    options: {
      description: 'Array of options that populate the select menu'
    },
    pageSize: {
      description: 'Number of options to jump in menu when page{up|down} keys are used'
    },
    placeholder: {
      description: 'Placeholder for the select value'
    },
    screenReaderStatus: {
      description: 'Status to relay to screen readers'
    },
    styles: {
      description: 'Style modifier methods'
    },
    tabIndex: {
      description: 'Sets the tabIndex attribute on the input',
      control: 'number'
    },
    tabSelectsValue: {
      description: 'Select the currently focused option when the user presses tab',
      control: 'boolean'
    }
  },

  parameters: {
    docs: {
      description: {
        component: `
Select component to select value from options.

See [https://react-select.com/props](https://react-select.com/props) for more information.


## When To Use

- A dropdown menu for displaying choices - an elegant alternative to the native \`<select>\` element.
`
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/YcVOEbdec2oqyKrYFSkeYW/Components-Base?node-id=1373%3A4886'
    }
  }
} as ComponentMeta<typeof Select>

const exampleDemo = [
  { value: 'yellow', label: 'Yellow' },
  { value: 'green', label: 'Green' },
  { value: 'forest', label: 'Forest' },
  { value: 'slate', label: 'Slate' }
]

const Template: ComponentStory<typeof Select> = args => <Select {...args} />
export const Basic = Template.bind({})
Basic.args = {
  options: exampleDemo
}

export const MultiSelect = Template.bind({})
MultiSelect.args = {
  options: exampleDemo,
  multi: true
}

export const SearchableSelect = Template.bind({})
SearchableSelect.args = {
  options: exampleDemo,
  searchable: true,
  clearable: true
}

export const LargeDataSet = Template.bind({})
LargeDataSet.args = {
  options: [...Array(1000).keys()].map(i => ({ value: i, label: `label${i}` }))
}
