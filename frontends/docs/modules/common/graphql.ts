import { gql } from "@apollo/client"

export const queryPods = gql`
  query GetPods {
    pods {
      webid,
      name,
      avatar
    }
  }
`
