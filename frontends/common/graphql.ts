import { gql } from '@apollo/client'

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
