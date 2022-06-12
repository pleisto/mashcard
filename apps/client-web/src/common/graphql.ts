import { gql } from '@apollo/client'

export const queryDomainExists = gql`
  query QueryDomainAvailableFromWS($domain: String!) {
    domainAvailable(domain: $domain) {
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
      domain
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
  query GetPod($domain: String!) {
    pod(domain: $domain) {
      id
      domain
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
  query GetCurrentPod($domain: String!) {
    currentPodDomain @client @export(as: "domain")
    pod(domain: $domain) {
      id
      domain
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
      domain
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
