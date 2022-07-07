import { gql } from '@apollo/client'

export const EmailPasswordSignIn = gql`
  mutation userEmailPasswordSignIn($input: UserEmailPasswordSignInInput!) {
    userEmailPasswordSignIn(input: $input) {
      errors
      redirectPath
    }
  }
`

export const FederatedIdentitySession = gql`
  query GetFederatedIdentitySession {
    federatedIdentitySession {
      hasSession
      domain
      name
      provider
    }
  }
`

export const UserCreate = gql`
  mutation userCreate($input: UserCreateInput!) {
    userCreate(input: $input) {
      errors
      redirectPath
      isUserActive
    }
  }
`

export const UserConfirmationEmailResend = gql`
  mutation userConfirmationEmailResend($input: UserConfirmationEmailResendInput!) {
    userConfirmationEmailResend(input: $input) {
      errors
    }
  }
`

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
