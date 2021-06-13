import { gql } from '@apollo/client'

export const EmailPasswordSignIn = gql`
  mutation emailPasswordSignIn($input: EmailPasswordSignInInput!) {
    emailPasswordSignIn(input: $input){
      errors
      redirectPath
    }
  }
`
