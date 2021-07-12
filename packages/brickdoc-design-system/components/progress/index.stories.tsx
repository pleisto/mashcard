import React from 'react'
import { Story } from '@storybook/react'
import { Progress, ProgressProps, Space } from '../'
export default {
  title: 'ReactComponents/Progress',
  component: Progress,
  parameters: {
    docs: {
      description: {
        component: `
Display the current progress of an operation flow.

## When To Use

If it will take a long time to complete an operation, you can use \`Progress\` to show the current progress and status.

- When an operation will interrupt the current interface, or it needs to run in the background for more than 2 seconds.
- When you need to display the completion percentage of an operation.

## API

Properties that shared by all types.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| format | The template function of the content | function(percent, successPercent) | (percent) => percent + \`%\` |
| percent | To set the completion percentage | number | 0 |
| showInfo | Whether to display the progress value and the status icon | boolean | true |
| status | To set the status of the Progress, options: \`success\` \`exception\` \`normal\` \`active\`(line only) | string | - |
| strokeColor | The color of progress bar | string | - |
| strokeLinecap | To set the style of the progress linecap | \`round\` \\| \`square\` | \`round\` |
| success | Configs of successfully progress bar | { percent: number, strokeColor: string } | - |
| trailColor | The color of unfilled part | string | - |
| type | To set the type, options: \`line\` \`circle\` \`dashboard\` | string | \`line\` |

### \`type="line"\`

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| steps | The total step count | number | - |
| strokeColor | The color of progress bar, render \`linear-gradient\` when passing an object | string \\| { from: string; to: string; direction: string } | - |
| strokeWidth | To set the width of the progress bar, unit: \`px\` | number | 10 |

### \`type="circle"\`

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| strokeColor | The color of circular progress, render \`linear-gradient\` when passing an object | string \\| object | - |
| strokeWidth | To set the width of the circular progress, unit: percentage of the canvas width | number | 6 |
| width | To set the canvas width of the circular progress, unit: \`px\` | number | 132 |

### \`type="dashboard"\`

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| gapDegree | The gap degree of half circle, 0 ~ 295 | number | 75 |
| gapPosition | The gap position, options: \`top\` \`bottom\` \`left\` \`right\` | string | \`bottom\` |
| strokeWidth | To set the width of the dashboard progress, unit: percentage of the canvas width | number | 6 |
| width | To set the canvas width of the dashboard progress, unit: \`px\` | number | 132 |
`
      }
    }
  }
}

const Template: Story<ProgressProps> = _args => (
  <>
    <Progress percent={30} />
    <Progress percent={50} status="active" />
    <Progress percent={70} status="exception" />
    <Progress percent={100} />
    <Progress percent={50} showInfo={false} />
    <br />
    <br />
    <br />
    <Space size="large">
      <Progress type="circle" percent={75} />
      <Progress type="circle" percent={70} status="exception" />
      <Progress type="dashboard" percent={75} />
    </Space>
  </>
)
export const Base = Template.bind({})
