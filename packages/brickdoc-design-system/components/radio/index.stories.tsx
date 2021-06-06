import React from "react"
import { Story } from "@storybook/react"
import { Radio, RadioProps } from "../../"
export default {
  title: "ReactComponents/Radio",
  component: Radio,
  argTypes: {
    buttonStyle: {
      description: 'The style type of radio button',
      defaultValue: 'outline',
      control: {
        type: 'radio',
        options: ['outline','solid']
      },
      table: {
        type: { summary: 'outline | solid' },
        defaultValue: { summary:'outline'}
      }
    },
    defaultValue: {
      description: 'Default selected value',
      table: {
        type: { summary: 'any' }
      }
    },
    disabled: {
      description: 'Disable all radio buttons',
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    name: {
      description: 'The name property of all input[type="radio"] children',
      control: {
        type: 'text'
      },
      table: {
        type: { summary: 'string'}
      }
    },
    options: {
      description: 'Set children optional',
      table: {
        type: {summary: 'string[] | Array<{ label: string value: string disabled?: boolean }>'}
      }
    },
    optionType: {
      description: 'Set Radio optionType',
      defaultValue: 'default',
      control: {
        type: 'radio',
        options: ['button','default']
      },
      table: {
        type: { summary: 'button | default' },
        defaultValue: { summary:'default'}
      }
    },
    size: {
      description: 'The size of radio button style',
      defaultValue: 'middle',
      control: {
        type: 'radio',
        options: ['large','middle','small']
      },
      table: {
        type: { summary: 'large | middle | small' },
        defaultValue: { summary:'middle'}
      }
    },
    value: {
      description: 'Used for setting the currently selected value',
      table: {
        type: { summary: 'any' }
      }
    },
    onChange: {
      description: 'The callback function that is triggered when the state changes',
      table: {
        type: { summary: 'function(e:Event)' }
      }
    },
  }
  ,
  parameters: {
    docs: {
      description: {
        component: `
Radio.

## When To Use

- Used to select a single state from multiple options.
- The difference from Select is that Radio is visible to the user and can facilitate the comparison of choice, which means there shouldn't be too many of them.

## API

### Radio/Radio.Button

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| autoFocus | Whether get focus when component mounted | boolean | false |
| checked | Specifies whether the radio is selected | boolean | false |
| defaultChecked | Specifies the initial state: whether or not the radio is selected | boolean | false |
| disabled | Disable radio | boolean | false |
| value | According to value for comparison, to determine whether the selected | any | - |

## Radio Methods

| Name | Description |
| --- | --- |
| blur() | Remove focus |
| focus() | Get focus |
`
      }
    }
  }
}

const plainOptions = ['Apple', 'Pear', 'Orange']
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
]
const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: true },
]


const Template: Story<RadioProps> = (args) =>
  <>
    <Radio.Group
      {...args}
    />
    <br /><br />
    <Radio.Group options={plainOptions}  />
    <br />
    <Radio.Group options={optionsWithDisabled}  />

  </>
export const Base = Template.bind({})

Base.args = {
  options,
  optionType: 'button',
}
