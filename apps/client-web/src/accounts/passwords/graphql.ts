import { gql } from '@apollo/client'

export const UserForgetPasswordMailSend = gql`
  mutation userForgetPasswordMailSend($input: UserForgetPasswordMailSendInput!) {
    userForgetPasswordMailSend(input: $input) {
      errors
    }
  }
`

export const UserPasswordReset = gql`
  mutation userPasswordReset($input: UserPasswordResetInput!) {
    userPasswordReset(input: $input) {
      errors
    }
  }
`
