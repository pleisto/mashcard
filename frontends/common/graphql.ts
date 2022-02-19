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
export const querySpaces = gql`
  query GetSpaces {
    spaces {
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

export const querySpace = gql`
  query GetSpace($domain: String!) {
    space(domain: $domain) {
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

export const queryCurrentSpace = gql`
  query GetCurrentSpace($domain: String!) {
    currentSpaceDomain @client @export(as: "domain")
    space(domain: $domain) {
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

export const querySpaceMembers = gql`
  query GetSpaceMembers {
    spaceMembers {
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
