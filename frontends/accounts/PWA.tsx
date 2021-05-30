import React from 'react'
import PWAProvider from "@/common/PWAProvider"
import { Button, notification } from '@brickdoc/design-system'

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
  </>
}

export default <PWAProvider><AccountsPWA /></PWAProvider>
