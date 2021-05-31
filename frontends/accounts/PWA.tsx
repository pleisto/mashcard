import React from 'react'
import PWAProvider from "@/common/PWAProvider"
import { Form, Input, Button, notification, Alert } from '@brickdoc/design-system'

const success = () => {
  notification.success({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
  })
}

const AccountsPWA = ()=>{
  return <>
    <div>123 天地玄黄</div>
    <Button  onClick={success}>宇宙洪荒</Button>
    <Button type="primary" loading={true}>Loading....</Button>
    <Alert message="Success Tips" type="success" showIcon />
    <Alert message="Informational Notes" type="info" showIcon />
    <Alert
      message="Success Tips"
      description="Detailed description and advice about successful copywriting."
      type="success"
      closable
      showIcon
    />
    <Alert
      message="Informational Notes"
      description="Additional description and information about copywriting."
      type="info"
      closable
      showIcon
    />
    <Form>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
    </Form>
  </>
}

export default <PWAProvider><AccountsPWA /></PWAProvider>
