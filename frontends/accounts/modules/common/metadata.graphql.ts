import { gql } from '@apollo/client'

export const getAvaailableLocales = gql`
  query GetAvailableLocalesFromWS {
    metadata {
      id
      availableLocales{
        label
        value
      }
    }
  }
`
