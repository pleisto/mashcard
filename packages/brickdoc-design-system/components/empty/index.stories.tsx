import React from "react"
import { Story } from "@storybook/react"
import { Empty, EmptyProps, Button } from "../../"


export default {
  title: "ReactComponents/Empty",
  component: Empty,
  parameters: {
  docs: {
    description: {
      component: `
Empty state placeholder.

#### When To Use

* When there is no data provided, display for friendly tips.
* User tutorial to create something in fresh new situation.



#### API


\`\`\`jsx
<Empty>
  <Button>Create</Button>
</Empty>
\`\`\`

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| description | Customize description | ReactNode | - |
| image | Customize image. Will treat as image url when string provided | ReactNode | \`Empty.PRESENTED_IMAGE_DEFAULT\` |
| imageStyle | The style of image | CSSProperties | - |
`
    }
  }
}
}


const Template: Story<EmptyProps> = (_args) =>
  <>
    <Empty />
    <br/><hr /><br/>
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    <br/><hr /><br/>
    <Empty
      image="https://s3.brickapis.com/design-system/empty.svg"
      imageStyle={{
        height: 60,
      }}
      description={
        <span>
        Customize <a href="#">Description</a>
      </span>
      }
    >
      <Button type="primary">Create Now</Button>
    </Empty>
    <br/><hr /><br/>
    <Empty description={false} />
  </>
export const Base = Template.bind({})




