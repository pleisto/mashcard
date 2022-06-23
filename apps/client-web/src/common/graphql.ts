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
      ... on User {
        id
        domain
        owned
        name
        type
        personal
        avatarData {
          url
          signedId
          downloadUrl
        }
        bio
      }
      ... on Group {
        id
        domain
        owned
        name
        type
        personal
        avatarData {
          url
          signedId
          downloadUrl
        }
        inviteEnable
        bio
      }
    }
  }
`

export const queryPod = gql`
  query GetPod($domain: String!) {
    pod(domain: $domain) {
      ... on User {
        id
        domain
        owned
        name
        type
        personal
        avatarData {
          url
          signedId
          downloadUrl
        }
        bio
      }
      ... on Group {
        id
        domain
        owned
        name
        type
        personal
        avatarData {
          url
          signedId
          downloadUrl
        }
        inviteEnable
        inviteSecret
        bio
      }
    }
  }
`

export const queryCurrentPod = gql`
  query GetCurrentPod($domain: String!) {
    currentPodDomain @client @export(as: "domain")
    pod(domain: $domain) {
      ... on User {
        id
        domain
        owned
        name
        type
        personal
        avatarData {
          url
          signedId
          downloadUrl
        }
        bio
      }
      ... on Group {
        id
        domain
        owned
        name
        type
        personal
        avatarData {
          url
          signedId
          downloadUrl
        }
        inviteEnable
        inviteSecret
        bio
      }
    }
  }
`

export const queryPodMembers = gql`
  query GetPodMembers {
    podMembers {
      domain
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
