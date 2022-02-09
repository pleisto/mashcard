import { gql } from '@apollo/client'

export const ChangeWebid = gql`
  mutation updateWebid($input: UpdateWebidInput!) {
    updateWebid(input: $input) {
      errors
    }
  }
`

export const UserAppearanceUpdate = gql`
  mutation UserAppearanceUpdate($input: UserAppearanceUpdateInput!) {
    userAppearanceUpdate(input: $input) {
      errors
    }
  }
`
