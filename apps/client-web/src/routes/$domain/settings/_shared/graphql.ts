import { gql } from '@apollo/client'

export const ChangeDomain = gql`
  mutation updateDomain($input: UpdateDomainInput!) {
    updateDomain(input: $input) {
      errors
    }
  }
`

export const UserAppearanceUpdate = gql`
  mutation userAppearanceUpdate($input: UserAppearanceUpdateInput!) {
    userAppearanceUpdate(input: $input) {
      errors
    }
  }
`

export const UserDestroy = gql`
  mutation userDestroy($input: UserDestroyInput!) {
    userDestroy(input: $input) {
      errors
    }
  }
`

export const GroupDestroy = gql`
  mutation groupDestroy($input: GroupDestroyInput!) {
    groupDestroy(input: $input) {
      errors
    }
  }
`

export const GroupLeave = gql`
  mutation groupLeave($input: GroupLeaveInput!) {
    groupLeave(input: $input) {
      errors
    }
  }
`
