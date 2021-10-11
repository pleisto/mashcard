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
      webid
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
