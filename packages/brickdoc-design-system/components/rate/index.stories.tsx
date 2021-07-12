import React from 'react'
import { Story } from '@storybook/react'
import { Rate, RateProps } from '../'
import { OvalLove } from '../icon'
export default {
  title: 'ReactComponents/Rate',
  component: Rate,
  parameters: {
    docs: {
      description: {
        component: `
Rate component.

## When To Use

- Show evaluation.
- A quick rating operation on something.

## API

| Property | Description | type | Default |
| --- | --- | --- | --- |
| allowClear | Whether to allow clear when click again | boolean | true |
| allowHalf | Whether to allow semi selection | boolean | false |
| autoFocus | If get focus when component mounted | boolean | false |
| character | The custom character of rate | ReactNode \\| (RateProps) => ReactNode | &lt;StarFilled /> |
| className | The custom class name of rate | string | - |
| count | Star count | number | 5 |
| defaultValue | The default value | number | 0 |
| disabled | If read only, unable to interact | boolean | false |
| style | The custom style object of rate | CSSProperties | - |
| tooltips | Customize tooltip by each character | string\\[] | - |
| value | The current value | number | - |
| onBlur | Callback when component lose focus | function() | - |
| onChange | Callback when select value | function(value: number) | - |
| onFocus | Callback when component get focus | function() | - |
| onHoverChange | Callback when hover item | function(value: number) | - |
| onKeyDown | Callback when keydown on component | function(event) | - |

## Methods

| Name | Description |
| --- | --- |
| blur() | Remove focus |
| focus() | Get focus |
`
      }
    }
  }
}

const Template: Story<RateProps> = _args => (
  <>
    <Rate allowHalf defaultValue={2.5} />
    <br />
    <br />
    <Rate character={<OvalLove />} />
    <br />
    <br />
    <Rate character="好" allowHalf />
  </>
)
export const Base = Template.bind({})
