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

export const UserDestroy = gql`
  mutation UserDestroy($input: UserDestroyInput!) {
    userDestroy(input: $input) {
      errors
    }
  }
`

export const PodDestroy = gql`
  mutation PodDestroy($input: PodDestroyInput!) {
    podDestroy(input: $input) {
      errors
    }
  }
`

export const PodLeave = gql`
  mutation PodLeave($input: PodLeaveInput!) {
    podLeave(input: $input) {
      errors
    }
  }
`
