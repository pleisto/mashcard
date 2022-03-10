import { useQuery, QueryHookOptions, OperationVariables, DocumentNode, QueryResult } from '@apollo/client'

/**
 * Small wrapper around `useQuery` so that we can use it imperatively.
 *
 * @see Credit: https://github.com/apollographql/react-apollo/issues/3499#issuecomment-586039082
 *
 * @example
 * const callQuery = useImperativeQuery(query, options)
 * const handleClick = async () => {
 *   const{ data, error } = await callQuery()
 * }
 */
export function useImperativeQuery<TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options: QueryHookOptions<TData, TVariables> = {}
): QueryResult<TData, TVariables>['refetch'] {
  const { refetch } = useQuery<TData, TVariables>(query, {
    ...options,
    skip: true
  })

  return async (queryVariables: TVariables) => await refetch(queryVariables)
}
