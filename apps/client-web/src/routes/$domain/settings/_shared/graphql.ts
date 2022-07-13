import { gql } from '@apollo/client'

export const ChangeDomain = gql`
  mutation updateDomain($input: UpdateDomainInput!) {
    updateDomain(input: $input) {
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

export const UserDestroy = gql`
  mutation UserDestroy($input: UserDestroyInput!) {
    userDestroy(input: $input) {
      errors
    }
  }
`

export const GroupDestroy = gql`
  mutation GroupDestroy($input: GroupDestroyInput!) {
    groupDestroy(input: $input) {
      errors
    }
  }
`

export const GroupLeave = gql`
  mutation GroupLeave($input: GroupLeaveInput!) {
    groupLeave(input: $input) {
      errors
    }
  }
`
