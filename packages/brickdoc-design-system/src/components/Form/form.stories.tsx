import { Form } from './'
import { Input } from '../Input'
import { Button } from '../Button'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Form',
  component: Form,
  argTypes: {
    onSubmit: {
      description: '`(data: Object, e?: Event) => void` A successful callback.'
    },
    onError: {
      description: '`(errors: Object, e?: Event) => void` An error callback.'
    },
    form: {
      description: '`useForm` hook return object. see https://react-hook-form.com/api/useform'
    },
    layout: {
      description: 'The layout of the form.',
      control: {
        type: 'radio'
      },
      options: ['vertical', 'horizontal']
    },
    css: {
      description: 'The stitches CSS of the form.'
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
 Smart Form Component based on react-hook-form.
`
      }
    }
  }
} as ComponentMeta<typeof Form>

const Template: ComponentStory<typeof Form> = () => {
  const form = Form.useForm<{ phone: number; password: string }>()
  return (
    <Form form={form} onSubmit={(data: any) => console.log('form submit', data)}>
      <Form.Field name="phone">
        <Input type="number" />
      </Form.Field>
      <Form.Field name="password">
        <Input type="password" />
      </Form.Field>
      <Form.Field>
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Field>
    </Form>
  )
}
export const Basic = Template.bind({})
