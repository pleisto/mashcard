import React from 'react'
import { Story } from '@storybook/react'
import { Checkbox, CheckboxProps } from '../'

export default {
  title: 'ReactComponents/Checkbox',
  component: Checkbox,
  argTypes: {
    autoFocus: {
      description: 'If get focus when component mounted',
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    checked: {
      description: 'Specifies whether the checkbox is selected',
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    defaultChecked: {
      description: 'Specifies the initial state: whether or not the checkbox is selected',
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    disabled: {
      description: 'If disable checkbox',
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    indeterminate: {
      description: 'The indeterminate checked state of checkbox',
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    onChange: {
      description: 'The callback function that is triggered when the state changes',
      table: {
        type: { summary: 'function(e:Event)' }
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
Checkbox component.

#### When To Use

* Used for selecting multiple values from several options.
* If you use only one checkbox, it is the same as using Switch to toggle between two states.
 The difference is that Switch will trigger the state change directly,
 but Checkbox just marks the state as changed and this needs to be submitted.


#### Methods

| Name | Description | Version |
| --- | --- | --- |
| blur() | Remove focus |  |
| focus() | Get focus |  |
`
      }
    }
  }
}

const Template: Story<CheckboxProps> = args => <Checkbox {...args}>Checkbox</Checkbox>
export const Base = Template.bind({})

const plainOptions = ['Apple', 'Pear', 'Orange']
const defaultCheckedList = ['Apple', 'Orange']
export const CheckboxGroup: Story<CheckboxProps> = _args => <Checkbox.Group options={plainOptions} value={defaultCheckedList} />

CheckboxGroup.parameters = {
  docs: {
    description: {
      story: `
Generate a group of checkboxes from an array.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| defaultValue | Default selected value | string\\[] | \\[] |
| disabled | If disable all checkboxes | boolean | false |
| name | The \`name\` property of all \`input[type="checkbox"]\` children | string | - |
| options | Specifies options | string\\[] \\| Option\\[] | \\[] |
| value | Used for setting the currently selected value | string\\[] | \\[] |
| onChange | The callback function that is triggered when the state changes | function(checkedValue) | - |
      `
    }
  }
}
