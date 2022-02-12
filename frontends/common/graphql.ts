import { gql } from '@apollo/client'

export const queryWebidExists = gql`
  query QueryWebidAvailableFromWS($webid: String!) {
    webidAvailable(webid: $webid) {
      success
      message
    }
  }
`
export const queryMetadata = gql`
  query GetMetadataFromWS {
    metadata {
      id
      availableLocales {
        label
        value
      }
      availableTimezones
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
        downloadUrl
        signedId
      }
    }
  }
`
export const queryPods = gql`
  query GetPods {
    pods {
      id
      webid
      name
      email
      personal
      inviteEnable
      owned
      avatarData {
        url
        downloadUrl
        signedId
      }
      bio
    }
  }
`

export const queryPod = gql`
  query GetPod($webid: String!) {
    pod(webid: $webid) {
      id
      webid
      name
      personal
      inviteEnable
      inviteSecret
      avatarData {
        url
        downloadUrl
        signedId
      }
      bio
    }
  }
`

export const queryCurrentPod = gql`
  query GetCurrentPod($webid: String!) {
    currentPodWebid @client @export(as: "webid")
    pod(webid: $webid) {
      id
      webid
      name
      personal
      owned
      inviteEnable
      inviteSecret
      avatarData {
        url
        downloadUrl
        signedId
      }
      bio
    }
  }
`

export const queryPodMembers = gql`
  query GetPodMembers {
    podMembers {
      webid
      email
      name
      role
      state
      avatarData {
        url
        downloadUrl
        signedId
      }
    }
  }
`
