import { OperationVariables, useApolloClient, ApolloQueryResult} from '@apollo/client'
import { DocumentNode } from 'graphql'
import { useState } from 'react'

/**
 *
 * @see Credit: https://github.com/apollographql/apollo-client/issues/7714
  *
 */
export const useAsyncQuery = <TData, TVariables = OperationVariables>(
  query: DocumentNode
): [
  (variables: TVariables) => Promise<ApolloQueryResult<TData>>,
  { loading: boolean }
] => {
  const [loading, setLoading] = useState(false)
  const client = useApolloClient()

  const runQuery = async (variables: TVariables) => {
    setLoading(true)
    const res = await client.query<TData, TVariables>({ query, variables })
    setLoading(false)
    return res
  }

  return [runQuery, { loading }]
}
