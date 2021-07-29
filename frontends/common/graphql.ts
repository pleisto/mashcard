import { gql } from '@apollo/client'

export const queryWebidExists = gql`
  query QueryWebidAvailableFromWS($webid: String!) {
    webidAvailable(webid: $webid)
  }
`
export const getAvaailableLocales = gql`
  query GetAvailableLocalesFromWS {
    metadata {
      id
      availableLocales {
        label
        value
      }
    }
  }
`

export const CreateDirectUpload = gql`
  mutation createDirectUpload($input: CreateDirectUploadInput!) {
    createDirectUpload(input: $input) {
      directUpload {
        uploadUrl
        headers
        blobKey
        viewUrl
      }
    }
  }
`
