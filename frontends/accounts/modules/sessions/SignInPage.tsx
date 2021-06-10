import React, { useEffect } from "react"
import { AuthMethod } from "@/BrickdocGraphQL"
import { useBoolean } from "ahooks"
import { useAccountsAuthMethods } from "./hooks/useAccountsAuthMethods"
import { Skeleton, Divider, Button, Tooltip } from "@brickdoc/design-system"

const Page: React.FC = () => {
  const [renderEmailPasswordForm, { setTrue }] = useBoolean(false)
  const { loading, authMethods } = useAccountsAuthMethods(setTrue)
  useEffect(()=>{
    if (!loading && authMethods[0].name === AuthMethod.EmailPassword) setTrue()
  })

  if (loading) {
    return <Skeleton active />
  }

  const emailPasswordAuthInput = <div>
    <input name="email" />
    <input name="password" />
    <Button type="primary">Sign In</Button>
  </div>


  const otherAuthMethodsList = (methods) => methods.map(i => <Tooltip key={i.name} title={i.name}>
    <Button shape="circle" icon={i.logo} onClick={i.action} /></Tooltip>)


  return <div>
    <h1>Sign In</h1>
    <div>
      { // Primary Area
        renderEmailPasswordForm ? emailPasswordAuthInput :
          <Button icon={authMethods[0].logo} onClick={authMethods[0].action} block>{authMethods[0].name}</Button>
      }
      {authMethods.length >= 2 && <>
        <Divider plain>or Login with</Divider>
        { // Footer
          renderEmailPasswordForm ?
            // skip EmailPassword if emailPassword has been rendered.
            otherAuthMethodsList(authMethods.filter(x => x.name !== AuthMethod.EmailPassword)) :
            // `slice` could skip `preferred` auth method.
            otherAuthMethodsList(authMethods.slice(1))
        }
      </>}
    </div>
  </div>
}

export default Page
