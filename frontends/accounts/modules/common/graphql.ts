import { gql } from '@apollo/client'


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
