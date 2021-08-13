import { gql } from '@apollo/client'

export const queryEmailExists = gql`
  query QueryEmailAvailableFromWS($email: String!) {
    emailAvailable(email: $email) {
      success
      message
    }
  }
`

export const queryPasswordExists = gql`
  query QueryPasswordAvailableFromWS($password: String!) {
    passwordAvailable(password: $password) {
      success
      message
    }
  }
`

export const queryWebidExists = gql`
  query QueryWebidAvailableFromWS($webid: String!) {
    webidAvailable(webid: $webid) {
      success
      message
    }
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
        signedId
      }
    }
  }
`
