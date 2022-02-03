import { Form } from './'
import { Input } from '../Input'
import { Button } from '../Button'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Form',
  component: Form,
  args: {
    mode: 'onBlur',
    reValidateMode: 'onChange'
  },
  argTypes: {
    onSubmit: {
      description: '`(data: Object, e?: Event) => void` A successful callback.'
    },
    onError: {
      description: '`(errors: Object, e?: Event) => void` An error callback.'
    },
    mode: {
      description:
        'This option allows you to configure the validation strategy before user submit the form (onSubmit event).',
      control: {
        type: 'radio'
      },
      options: ['onSubmit', 'onBlur', 'onChange', 'onTouched', 'all']
    },
    reValidateMode: {
      description:
        'This option allows you to configure validation strategy when inputs with errors get re-validated after user submit the form (onSubmit event). By default, validation is triggered during the input change event.',
      control: {
        type: 'radio'
      },
      options: ['onChange', 'onBlur', 'onSubmit']
    },
    defaultValues: {
      description: '`Record<string, any> = {}` Default values for the form.'
    },
    resolver: {
      description:
        "This function allows you to use any external validation library such as Yup, Zod, Joi, Superstruct, Vest and many others. The goal is to make sure you can seamlessly integrate whichever validation library you prefer. If you're not using a library, you can always write your own logic to validate your forms."
    },
    context: {
      description: "This context object is mutable and will be injected into the resolver's second argument"
    },
    criteriaMode: {
      description:
        'When set to firstError (default), only the first error from each field will be gathered. \n When set to all, all errors from each field will be gathered.',
      control: {
        type: 'radio'
      },
      options: ['firstError', 'all']
    },
    shouldFocusError: {
      description:
        'When set to true (default) and the user submits a form that fails the validation, it will set focus on the first field with an error.',
      control: 'boolean'
    },
    shouldUnregister: {
      description:
        'By default, an input value will be retained when input is removed. However, you can set shouldUnregister to true to unregister input during unmount.',
      control: 'boolean'
    },
    delayError: {
      control: 'number',
      describe:
        'This config will delay the error state to be displayed to the end-user in milliseconds. Correct the error input will remove the error instantly and delay will not be applied.'
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

const Template: ComponentStory<typeof Form> = args => (
  <Form {...args}>
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
export const Basic = Template.bind({})
Basic.args = {
  onSubmit: data => console.log('form submit', data)
}
