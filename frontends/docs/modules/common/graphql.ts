import { gql } from "@apollo/client"

export const queryPods = gql`
  query GetPods {
    pods {
      id,
      webid,
      name,
      avatar
    }
  }
`

export const queryPageBlocks = gql`
  query GetPageBlocks($webid: String!) {
    pageBlocks(webid: $webid){
      id
      parentId
      data {
        title
      }
      sort
    }
  }
`
