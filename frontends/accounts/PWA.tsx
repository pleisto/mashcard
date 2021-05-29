import React from 'react'
import PWAProvider from "@/common/PWAProvider"
import { Button } from '@brickdoc/design-system'

const AccountsPWA = ()=>{
  return <>
    <div>123 天地玄黄</div>
    <Button type="primary">宇宙洪荒</Button>
  </>
}

export default <PWAProvider><AccountsPWA /></PWAProvider>
