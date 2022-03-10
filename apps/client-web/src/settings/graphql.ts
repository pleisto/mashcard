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

export const SpaceDestroy = gql`
  mutation SpaceDestroy($input: SpaceDestroyInput!) {
    spaceDestroy(input: $input) {
      errors
    }
  }
`

export const SpaceLeave = gql`
  mutation SpaceLeave($input: SpaceLeaveInput!) {
    spaceLeave(input: $input) {
      errors
    }
  }
`
