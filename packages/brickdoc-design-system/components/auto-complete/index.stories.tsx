import React from 'react'
import { Story } from '@storybook/react'
import { AutoComplete, AutoCompleteProps, Input } from '../'

export default {
  title: 'ReactComponents/AutoComplete',
  component: AutoComplete,
  argTypes: {
    allowClear: {
      description: 'Show clear button',
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    autoFocus: {
      description: 'If get focus when component mounted',
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    backfill: {
      description: 'If backfill selected item the input when using keyboard',
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    children: {
      description: 'Customize input element',
      defaultValue: <Input />,
      table: {
        type: { summary: 'HTMLInputElement | HTMLTextAreaElement | React.ReactElement<InputProps>' },
        defaultValue: { summary: '<Input />' }
      }
    },
    defaultActiveFirstOption: {
      description: 'Whether active first option by default',
      defaultValue: true,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true }
      }
    },
    defaultOpen: {
      description: 'Initial open state of dropdown',
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' }
      }
    },
    defaultValue: {
      description: 'Initial selected option',
      control: {
        type: 'text'
      },
      table: {
        type: { summary: 'string' }
      }
    },
    disabled: {
      description: 'Whether disabled select',
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    dropdownClassName: {
      description: 'The className of dropdown menu',
      control: {
        type: 'text'
      },
      table: {
        type: { summary: 'string' }
      }
    },
    dropdownMatchSelectWidth: {
      description: `Determine whether the dropdown menu and the select input are the same width.
      Default set \`min-width\` same as input. Will ignore when value less than select width.
      \`false\` will disable virtual scroll`,
      defaultValue: true,
      table: {
        type: { summary: 'boolean | number' },
        defaultValue: { summary: true }
      }
    },
    filterOption: {
      description: `If true, filter options by input, if function, filter options against it.
      The function will receive two arguments, \`inputValue\` and \`option\`, if the function returns
      true, the option will be included in the filtered set; Otherwise, it will be excluded`,
      defaultValue: true,
      table: {
        type: { summary: 'boolean | function(inputValue, option)' },
        defaultValue: { summary: true }
      }
    },
    notFoundContent: {
      description: 'Specify content to show when no result matches',
      defaultValue: 'Not Found',
      control: {
        type: 'text'
      },
      table: {
        type: { summary: 'string' }
      }
    },
    open: {
      description: 'Controlled open state of dropdown',
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' }
      }
    },
    options: {
      description: 'Select options. Will get better perf than jsx definition',
      table: {
        type: { summary: '{ label, value }[]' }
      }
    },
    placeholder: {
      description: 'The placeholder of input',
      control: {
        type: 'text'
      },
      table: {
        type: { summary: 'string' }
      }
    },
    value: {
      description: 'Selected option',
      control: {
        type: 'text'
      },
      table: {
        type: { summary: 'string' }
      }
    },
    onBlur: {
      description: 'Called when leaving the component',
      table: {
        type: { summary: 'function()' }
      }
    },
    onChange: {
      description: 'Called when select an option or input value change, or value of input is changed',
      table: {
        type: { summary: 'function(value)\t' }
      }
    },
    onDropdownVisibleChange: {
      description: 'Call when dropdown open',
      table: {
        type: { summary: 'function(open)' }
      }
    },
    onFocus: {
      description: 'Called when entering the component',
      table: {
        type: { summary: 'function()' }
      }
    },
    onSearch: {
      description: 'Called when searching items',
      table: {
        type: { summary: 'function(value)' }
      }
    },
    onSelect: {
      description: "Called when a option is selected. param is option's value and option instance",
      table: {
        type: { summary: 'function(value, option)' }
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
Autocomplete function of input field.

#### When To Use
When there is a need for autocomplete functionality.

#### Methods
| Name | Description |
| --- | --- | --- |
| blur() | Remove focus |
| focus() | Get focus |
`
      }
    }
  }
}

const Template: Story<AutoCompleteProps> = args => <AutoComplete {...args} />

export const Base = Template.bind({})
Base.args = {
  placeholder: 'Brickdoc Search Engine',
  options: ['pods', 'accounts', 'demo'].map(v => ({ label: v, value: v })),
  filterOption: false
}
