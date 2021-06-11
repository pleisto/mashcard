import React, {useState} from 'react'
import { Story } from '@storybook/react'
import { Button, Alert, AlertProps, Space } from '../../'
import { Download } from '../icon'

export default  {
  title: 'ReactComponents/Alert',
  component: Alert,
  argTypes:{
    action:{
      description: 'The action of Alert',
      table: {
        type: {summary: 'ReactNode'}
      }
    },
    afterClose:{
      description: 'Called when close animation is finished',
      table: {
        type: {summary: '() => void'}
      }
    },
    banner: {
      description: 'Whether to show as banner',
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    closable: {
      description: 'Whether Alert can be closed',
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' }
      }
    },
    closeText:{
      description: 'Close text to show',
      table: {
        type: {summary: 'ReactNode'}
      }
    },
    description:{
      description: 'Additional content of Alert',
      table: {
        type: {summary: 'ReactNode'}
      }
    },
    icon:{
      description: 'Custom icon, effective when `showIcon` is true',
      table: {
        type: {summary: 'ReactNode'}
      }
    },
    message:{
      description: 'Content of Alert',
      table: {
        type: {summary: 'ReactNode'}
      }
    },
    showIcon: {
      description: 'Whether to show icon',
      defaultValue: true,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: '`false` in banner mode, default is `true`' }
      }
    },

    type:{
      defaultValue: 'info',
      control:{
        type: 'select',
        options: ['success', 'info', 'warning', 'error']
      },
      table: {
        type: { summary: 'string' }
      }
    },
    onClose:{
      description: 'Callback when Alert is closed',
      table:{
        type: { summary: '(e: MouseEvent) => void'}
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
Alert component for feedback.

#### When To Use
* When you need to show alert messages to users.
* When you need a persistent static container which is closable by user actions.
`
      }
    }
  }
}




const Template: Story<AlertProps> = (args) => <Alert {...args} />


export const Base = Template.bind({})

Base.args = {
  message: '42 is the answer to the ultimate question of life the universe and everything.'
}


export const Type: Story<AlertProps> = (_args) => (
  <>
    <Alert message="Success Text" type="success" />
    <br/><br/>
    <Alert message="Info Text" type="info" />
    <br/><br/>
    <Alert message="Warning Text" type="warning" />
    <br/><br/>
    <Alert message="Error Text" type="error" />
    <br/><br/>
    <div style={{border: '1px solid #bbb'}}>
      <Alert message="Success Text" type="success" banner />
      <Alert message="Info Text" type="info" banner />
      <Alert message="Warning Text" type="warning" banner />
      <Alert message="Error Text" type="error" banner />
    </div>
  </>
)

Type.parameters = {
  docs: {
    description: {
      story: ` There are 4 types of Alert: success, info, warning, error.`
    }
  }
}

export const Closable: Story<AlertProps> = (_args) => (
  <>
    <Alert
      message="我能吞下玻璃而不伤身体"
      type="warning"
      closable
    />
    <br/>
    <Alert
      message="Augmenting Human Intellect: A Conceptual Framework"
      description={<span>
        By "augmenting human intellect" we mean increasing the capability of a man to
        approach a complex problem situation, to gain comprehension to suit his particular
        needs, and to derive solutions to problems.
      </span>}
      type="info"
      closable
    />
  </>
)

Closable.parameters = {
  docs: {
    description: {
      story: `To show close button.`
    }
  }
}

export const Icon: Story<AlertProps> = (_args) => (
  <>
    <Alert message="Success Tips" type="success" showIcon /><br/>
    <Alert message="Informational Notes" type="info" showIcon /><br/>
    <Alert message="Warning" type="warning" showIcon closable /><br/>
    <Alert message="Error" type="error" showIcon /><br/>
    <Alert
      message="Success Tips"
      description="Detailed description and advice about successful copywriting."
      type="success"
      showIcon
    /><br/>
    <Alert
      message="Informational Notes"
      description="Additional description and information about copywriting."
      type="info"
      action={
        <Space direction="vertical">
          <Button size="small" type="primary">
            Accept
          </Button>
          <Button size="small" danger type="ghost">
            Decline
          </Button>
        </Space>
      }
      showIcon
    /><br/>
    <Alert
      message="Warning"
      description="This is a warning notice about copywriting."
      type="warning"
      showIcon
      closable
    /><br/>
    <Alert
      message="Error"
      description="This is an error message about copywriting."
      type="error"
      showIcon
    /><br/>
    <Alert
      message="Custom Icon"
      description="Boosting mankind's capability for coping with complex, urgent problems."
      type="info"
      showIcon
      icon={<Download />}
    />
  </>
)

Icon.parameters = {
  docs: {
    description: {
      story: `A relevant icon will make information clearer and more friendly.`
    }
  }
}

const { ErrorBoundary } = Alert
const ThrowError: React.FC = () => {
  const [error, setError] = useState<Error>()
  const onClick = () => {
    setError(new Error('An Uncaught Error'))
  }

  if (error) {
    throw error
  }
  return (
    <Button danger onClick={onClick}>
      Click me to throw a error
    </Button>
  )
}
export const ErrorBoundaryAlert: Story<AlertProps> = (_args) => {
  return (<ErrorBoundary>
    <ThrowError />
  </ErrorBoundary>)
}

ErrorBoundaryAlert.parameters = {
  docs: {
    description: {
      story: `To show close button.`
    }
  }
}
