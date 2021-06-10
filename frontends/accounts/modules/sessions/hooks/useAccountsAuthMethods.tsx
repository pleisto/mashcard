import { AuthMethod, useGetAccountsConfigFromWsQuery, } from "@/BrickdocGraphQL"
import { Mail, ImageIcon } from "@brickdoc/design-system/components/icon"
import { sortBy } from "lodash"
import { BrickdocContext } from '@/common/PWAProvider'
import React, { useContext } from "react"

interface authMethod {
  name: string;
  logo: JSX.Element;
  action: ()=>void;
}

function redirectToOAuthProvider(provider: string, csrfToken: string) {
  const form = document.createElement('form')
  form.method = 'post'
  form.action = `/accounts/auth/${provider}`
  form.innerHTML = `
    <input name="_method" value="POST" type="hidden" />
    <input name="authenticity_token" value="${csrfToken}" type="hidden" />
    <input type="submit" />
  `
  form.style.display = 'none'
  document.body.appendChild(form);
  (form.querySelector('[type="submit"]') ).click()
}

/**
 * A Array of enabled accounts authentication methods.
 * With the preferred authentication method at the TOP of this array.
 *
 * @param clickEmailPassword - If emailPasssword is not preferred, the function triggered when it is clicked
 */
export const useAccountsAuthMethods = (clickEmailPassword: () => void): { authMethods: authMethod[], loading: boolean } => {
  const { csrfToken }  = useContext(BrickdocContext)
  const { loading, data } = useGetAccountsConfigFromWsQuery()
  if (loading) {
    return { loading, authMethods: [] }
  }
  const config = data.metadata.config

  let authMethods = config.accountsFederatedProviders.map(i => ({
    name: i.name,
    logo: <ImageIcon src={i.logo} alt={`${i.name} logo`} />,
    action: () => redirectToOAuthProvider(i.name, csrfToken)
  }))
    // Add EmailPassword Auth if it enabled.
    .concat(config.accountsEmailPasswordAuth ? [{
      name: AuthMethod.EmailPassword,
      logo: <Mail theme="filled" />,
      action: clickEmailPassword
    }] : [])

  // Move `accountsPreferredAuthMethod` to the top of the authMethods array.
  authMethods = sortBy(authMethods, ({ name }) => name === config.accountsPreferredAuthMethod ? 0 : 1)
  return { authMethods, loading }
}
