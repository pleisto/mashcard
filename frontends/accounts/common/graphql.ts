import { gql } from '@apollo/client'

export const queryEmailExists = gql`
  query QueryEmailAvailableFromWS($email: String!) {
    emailAvailable(email: $email) {
      success
      message
    }
  }
`

export const queryPasswordExists = gql`
  query QueryPasswordAvailableFromWS($password: String!) {
    passwordAvailable(password: $password) {
      success
      message
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
