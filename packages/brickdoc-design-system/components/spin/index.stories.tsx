import React from "react"
import { Story } from "@storybook/react"
import { Spin, SpinProps, Space, Alert } from "../../"
import { Rotation as LoadingOutlined } from '../icon'
export default {
  title: "ReactComponents/Spin",
  component: Spin,
  parameters: {
    docs: {
      description: {
        component: `
A spinner for displaying loading state of a page or a section.

## When To Use

When part of the page is waiting for asynchronous data or during a rendering process, an appropriate loading animation can effectively alleviate users' inquietude.

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| delay | Specifies a delay in milliseconds for loading state (prevent flush) | number (milliseconds) | - |
| indicator | React node of the spinning indicator | ReactNode | - |
| size | The size of Spin, options: \`small\`, \`default\` and \`large\` | string | \`default\` |
| spinning | Whether Spin is spinning | boolean | true |
| tip | Customize description content when Spin has children | string | - |
| wrapperClassName | The className of wrapper when Spin has children | string | - |

### Static Method

- \`Spin.setDefaultIndicator(indicator: ReactNode)\`

  You can define default spin element globally.

`
      }
    }
  }
}



const Template: Story<SpinProps> = (_args) =>
  <>
    <Space size="middle">
      <Spin size="small" />
      <Spin />
      <Spin size="large" />
    </Space>
    <br/><br/>
    <Spin tip="Loading...">
      <Alert
        message="Alert message title"
        description="Further details about the context of this alert."
        type="info"
      />
    </Spin>
    <br/><br/>
    <Spin indicator={<LoadingOutlined spin size={24} />} />
  </>
export const Base = Template.bind({})

