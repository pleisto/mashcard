import React from "react"
import { useSignUpInitialValues } from "./hooks/useSignUpInitialValues"
import { useConfirmationValidator, useWebidAvailableValidator } from "@/accounts/modules/common/hooks"
import { Form, Input, Button } from '@brickdoc/design-system'
import { parse }  from 'qs'

const Page: React.FC = () => {
  // substr(1) could remove `?` char
  const qs = parse(window.location.search.substr(1))
  const { initialValues, hasFilled } = useSignUpInitialValues(qs.autofill as object | undefined)
  const providerName = qs.provider as string| undefined

  const passwordConfirmValidator = useConfirmationValidator('password')
  const webidAvailableValidator = useWebidAvailableValidator()

  const EmailPasswordFields = <>
    <Form.Item
      label="email"
      name="email"
      hasFeedback
      rules={[{required: !hasFilled}]}
    >
      <Input />
    </Form.Item>
  <Form.Item
    name="password"
    label="Password"
    hasFeedback
    rules={[{required: true}]}
  >
    <Input.Password />
  </Form.Item>
    <Form.Item
      name="confirm_password"
      label="Confirm Password"
      hasFeedback
      dependencies={['password']}
      rules={[{required: true}, passwordConfirmValidator]}
    >
      <Input.Password />
    </Form.Item>
  </>

  return <>
  <h1>Sign Up {providerName && `with ${providerName}` } </h1>
   <Form initialValues={initialValues} layout="vertical">
     <Form.Item
       label="webid"
       name="webid"
       hasFeedback
       validateTrigger={['onFocus','onBlur','onLoad']}
       rules={[{required: true}, webidAvailableValidator]}
     >
       <Input />
     </Form.Item>
     <Form.Item
       label="name"
       name="name"
       hasFeedback
       rules={[{required: true}]}
     >
       <Input />
     </Form.Item>
     {
       // Federated Sign Up could skip email and password
       !hasFilled && EmailPasswordFields
     }
     <Form.Item
       hidden
       name="locale"
       rules={[{required: true}]}
     >
       <Input />
     </Form.Item>
     <Form.Item
       hidden
       name="timezone"
       rules={[{required: true}]}
     >
       <Input />
     </Form.Item>
     <Form.Item>
       <Button type="primary" htmlType="submit">
         Sign Up
       </Button>
     </Form.Item>
   </Form>
  </>
}

export default Page
