import React from "react"
import { Story } from "@storybook/react"
import { Steps, StepsProps, Button, message } from "../../"
import { User, Certificate, Rotation as Loading, SmilingFace } from '../icon'
export default {
  title: "ReactComponents/Steps",
  component: Steps,
  parameters: {
    docs: {
      description: {
        component: `
Steps\` is a navigation bar that guides users through the steps of a task.

## When To Use

When a given task is complicated or has a certain sequence in the series of subtasks, we can decompose it into several steps to make things easier.

## API

\`\`\`jsx
<Steps>
  <Step title="first step" />
  <Step title="second step" />
  <Step title="third step" />
</Steps>
\`\`\`

### Steps

The whole of the step bar.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| className | Additional class to Steps | string | - |
| current | To set the current step, counting from 0. You can overwrite this state by using \`status\` of \`Step\` | number | 0 |
| direction | To specify the direction of the step bar, \`horizontal\` or \`vertical\` | string | \`horizontal\` |
| initial | Set the initial step, counting from 0 | number | 0 |
| labelPlacement | Place title and description with \`horizontal\` or \`vertical\` direction | string | \`horizontal\` |
| percent | Progress circle percentage of current step in \`process\` status (only works on basic Steps) | number | - |
| progressDot | Steps with progress dot style, customize the progress dot by setting it to a function. labelPlacement will be \`vertical\` | boolean \\| (iconDot, {index, status, title, description}) => ReactNode | false |
| responsive | change to vertical direction when screen width smaller than \`532px\` | boolean | - |
| size | To specify the size of the step bar, \`default\` and \`small\` are currently supported | string | \`default\` |
| status | To specify the status of current step, can be set to one of the following values: \`wait\` \`process\` \`finish\` \`error\` | string | \`process\` |
| type | Type of steps, can be set to one of the following values: \`default\`, \`navigation\` | string | \`default\` |
| onChange | Trigger when Step is changed | (current) => void | - |

### Steps.Step

A single step in the step bar.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| description | Description of the step, optional property | ReactNode | - |
| disabled | Disable click | boolean | false |
| icon | Icon of the step, optional property | ReactNode | - |
| status | To specify the status. It will be automatically set by \`current\` of \`Steps\` if not configured. Optional values are: \`wait\` \`process\` \`finish\` \`error\` | string | \`wait\` |
| subTitle | Subtitle of the step | ReactNode | - |
| title | Title of the step | ReactNode | - |
`
      }
    }
  }
}


const { Step } = Steps

const Template: Story<StepsProps> = (_args) =>
  <>
    <Steps current={1}>
      <Step title="Finished" description="This is a description." />
      <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
      <Step title="Waiting" description="This is a description." />
    </Steps>
    <br/><br/>
    <Steps>
      <Step status="finish" title="Login" icon={<User/>} />
      <Step status="finish" title="Verification" icon={<Certificate />} />
      <Step status="process" title="Pay" icon={<Loading />} />
      <Step status="wait" title="Done" icon={<SmilingFace />} />
    </Steps>
    <br/><br/>
    <Steps direction="vertical" size="small" current={1}>
      <Step title="Finished" description="This is a description." />
      <Step title="In Progress" description="This is a description." />
      <Step title="Waiting" description="This is a description." />
    </Steps>
  </>
export const Base = Template.bind({})

const steps = [
  {
    title: 'First',
    content: 'First-content',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
]

const App = () => {
  const [current, setCurrent] = React.useState(0)

  const next = () => {
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  return (
    <>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div style={{minHeight:'200px',marginTop:'16px',paddingTop:'80px',
        textAlign:'center',backgroundColor:'#fafafa',border:'1px dashed #e9e9e9'}}>{steps[current].content}</div>
      <div style={{marginTop: '24px'}}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  )
}

export const SwitchStep: Story<StepsProps> = (_args)=> <App/>
