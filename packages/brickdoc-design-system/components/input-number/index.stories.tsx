import React from 'react'
import { Story } from '@storybook/react'
import { InputNumber, InputNumberProps, Space, Button } from '../'

export default {
  title: 'ReactComponents/InputNumber',
  component: InputNumber,
  parameters: {
    docs: {
      description: {
        component: `
Enter a number within certain range with the mouse or keyboard.

#### When To Use

When a numeric value needs to be provided.

#### API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| autoFocus | If get focus when component mounted | boolean | false |
| bordered | Whether has border style | boolean | true |
| decimalSeparator | Decimal separator | string | - |
| defaultValue | The initial value | number | - |
| disabled | If disable the input | boolean | false |
| formatter | Specifies the format of the value presented | function(value: number \\| string): string | - |
| keyboard | If enable keyboard behavior | boolean | true |
| max | The max value | number | [Number.MAX_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) |
| min | The min value | number | [Number.MIN_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER) |
| parser | Specifies the value extracted from formatter | function(string): number | - |
| precision | The precision of input value. Will use \`formatter\` when config of \`formatter\` | number | - |
| readOnly | If readonly the input | boolean | false |
| size | The height of input box | \`large\` \\| \`middle\` \\| \`small\` | - |
| step | The number to which the current value is increased or decreased. It can be an integer or decimal | number \\| string | 1 |
| stringMode | Set value as string to support high precision decimals. Will return string value by \`onChange\` | boolean | false |
| value | The current value | number | - |
| onChange | The callback triggered when the value is changed | function(value: number \\| string \\| null) | - |
| onPressEnter | The callback function that is triggered when Enter key is pressed | function(e) | - |
| onStep | The callback function that is triggered when click up or down buttons | (value: number, info: { offset: number, type: 'up' \\| 'down' }) => void | - |

#### Methods

| Name    | Description  |
| ------- | ------------ |
| blur()  | Remove focus |
| focus() | Get focus    |

`
      }
    }
  }
}

const Demo = () => {
  const [value, setValue] = React.useState<string | number>('99')

  return (
    <Space>
      <InputNumber min={1} max={10} value={value} onChange={setValue} />
      <Button
        type="primary"
        onClick={() => {
          setValue(99)
        }}>
        Reset
      </Button>
    </Space>
  )
}

const Template: Story<InputNumberProps> = _args => (
  <>
    <InputNumber min={1} max={10} defaultValue={3} />
    <br />
    <br />
    <InputNumber
      size="large"
      defaultValue={1000 as number}
      formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={value => parseInt(value.replace(/\$\s?|(,*)/g, ''), 10)}
    />
    <br />
    <br />
    <InputNumber<string> style={{ width: 200 }} defaultValue="1" min="0" max="10" step="0.00000000000001" stringMode />
    <br />
    <br />
    <Demo />
  </>
)
export const Base = Template.bind({})
