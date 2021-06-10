import { gql } from '@apollo/client'

export const getAvaailableLocales = gql`
  query GetAvailableLocalesFromWS {
    metadata {
      id
      availableLocales{
        label
        value
      }
    }
  }
`

export const getAccountsConfig = gql`
  query GetAccountsConfigFromWS {
    metadata {
      id
      config{
        accountsPreferredAuthMethod
        accountsEmailPasswordAuth
        accountsFederatedProviders {
          name
          logo
        }
      }
    }
  }
`

export const queryAccountWebidExists  = gql`
  query QueryAccountWebidAvailableFromWS($webid: String!) {
    accountsWebidAvailable(webid: $webid)
  }
`
