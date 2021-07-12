import React from 'react'
import { Story } from '@storybook/react'
import { TimePicker, TimePickerProps } from '../'
export default {
  title: 'ReactComponents/TimePicker',
  component: TimePicker,
  parameters: {
    docs: {
      description: {
        component: `
To select/input a time.

## When To Use

---

By clicking the input box, you can select a time from a popup panel.

## API

---

\`\`\`jsx

<TimePicker defaultValue={Date.now()} />;
\`\`\`

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| allowClear | Whether allow clearing text | boolean | true |
| autoFocus | If get focus when component mounted | boolean | false |
| bordered | Whether has border style | boolean | true |
| className | The className of picker | string | - |
| clearIcon | The custom clear icon | ReactNode | - |
| clearText | The clear tooltip of icon | string | clear |  |
| defaultValue | To set default time | Date | - |
| disabled | Determine whether the TimePicker is disabled | boolean | false |
| disabledHours | To specify the hours that cannot be selected | function() | - |
| disabledMinutes | To specify the minutes that cannot be selected | function(selectedHour) | - |
| disabledSeconds | To specify the seconds that cannot be selected | function(selectedHour, selectedMinute) | - |
| format | To set the time format | string | \`HH:mm:ss\` |
| getPopupContainer | To set the container of the floating layer, while the default is to create a div element in body | function(trigger) | - |
| hideDisabledOptions | Whether hide the options that can not be selected | boolean | false |
| hourStep | Interval between hours in picker | number | 1 |
| inputReadOnly | Set the \`readonly\` attribute of the input tag (avoids virtual keyboard on touch devices) | boolean | false |
| minuteStep | Interval between minutes in picker | number | 1 |
| open | Whether to popup panel | boolean | false |
| placeholder | Display when there's no value | string \\| \\[string, string] | \`Select a time\` |
| popupClassName | The className of panel | string | - |
| popupStyle | The style of panel | CSSProperties | - |
| renderExtraFooter | Called from time picker panel to render some addon to its bottom | () => ReactNode | - |
| secondStep | Interval between seconds in picker | number | 1 |
| showNow | Whether to show \`Now\` button on panel | boolean | - |
| suffixIcon | The custom suffix icon | ReactNode | - |
| use12Hours | Display as 12 hours format, with default format \`h:mm:ss a\` | boolean | false |
| value | To set time | Date | - |
| onChange | A callback function, can be executed when the selected time is changing | function(time: Date, timeString: string): void | - |
| onOpenChange | A callback function which will be called while panel opening/closing | (open: boolean) => void | - |
| onSelect | A callback function, executes when a value is selected | function(time: Date): void | - |

## Methods

| Name | Description |
| --- | --- |
| blur() | Remove focus |
| focus() | Get focus |

### RangePicker

Same props from RangePicker of DatePicker. And includes additional props:

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| order | Order start and end time | boolean | true |

<style>
.code-box-demo .ant-picker { margin: 0 8px 12px 0; }
.ant-row-rtl .code-box-demo .ant-picker { margin: 0 0 12px 8px; }
</style>

`
      }
    }
  }
}

const Template: Story<TimePickerProps> = _args => (
  <>
    <TimePicker defaultValue={new Date()} />
    <br />
    <br />
    <TimePicker use12Hours format="h:mm a" />
    <br />
    <br />
    <TimePicker.RangePicker />
  </>
)
export const Base = Template.bind({})
