import { gql } from '@apollo/client'

export const getAvaailableLocales = gql`
  query GetAvailableLocalesFromWS {
    metadata {
      id
      availableLocales {
        label
        value
      }
    }
  }
`

export const UserSignOut = gql`
  mutation userSignOut($input: UserSignOutInput!) {
    userSignOut(input: $input) {
      errors
    }
  }
`

export const getAccountsConfig = gql`
  query GetAccountsConfigFromWS {
    metadata {
      id
      config {
        userAgreementLink
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

export const queryAccountWebidExists = gql`
  query QueryAccountWebidAvailableFromWS($webid: String!) {
    accountsWebidAvailable(webid: $webid)
  }
`
