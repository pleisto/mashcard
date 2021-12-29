import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Button } from '../Button'
import { ToasterPortal, toast } from './index'
export default {
  title: 'Components/Toast',
  component: ToasterPortal,
  args: {},
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: `
Toast component is used to give timely feedback to user's operations.
It could be the result feedback of the operation, such as success, failure, error, warning, etc.

SEE [https://react-hot-toast.com/](https://react-hot-toast.com/) for more information.
`
      }
    },
    design: {}
  }
} as ComponentMeta<typeof ToasterPortal>

const Template: ComponentStory<typeof Button> = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Button onClick={() => toast('This is a info message')}>Info</Button>
    <Button onClick={() => toast.loading('This is a loading message')}>Loading</Button>
    <Button onClick={() => toast.success('This is a success message')}>Success</Button>
    <Button onClick={() => toast.error('This is a error message')}>Error</Button>
    <Button onClick={() => toast.custom('This is a custom message')}>Custom</Button>
  </div>
)

export const Basic = Template.bind({})
