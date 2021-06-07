import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export interface RootQuery {
  __typename?: 'RootQuery'
  /** Return information about current Brickdoc server instance. */
  metadata: Metadata
}

/** Represents information about the Brickdoc Server Instance. */
export interface Metadata {
  __typename?: 'metadata'
  /** Current available locales. */
  availableLocales: Select_Option[]
  id: Scalars['ID']
}

/** Option Object for BrickDesign Select Component. */
export interface Select_Option {
  __typename?: 'select_option'
  /** option label */
  label: Scalars['String']
  /** option value */
  value: Scalars['String']
}

export type GetAvailableLocalesFromWsQueryVariables = Exact<{ [key: string]: never }>

export type GetAvailableLocalesFromWsQuery = { __typename?: 'RootQuery' } & {
  metadata: { __typename?: 'metadata' } & Pick<Metadata, 'id'> & {
      availableLocales: Array<{ __typename?: 'select_option' } & Pick<Select_Option, 'label' | 'value'>>
    }
}

export const GetAvailableLocalesFromWsDocument = gql`
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

/**
 * __useGetAvailableLocalesFromWsQuery__
 *
 * To run a query within a React component, call `useGetAvailableLocalesFromWsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAvailableLocalesFromWsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAvailableLocalesFromWsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAvailableLocalesFromWsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAvailableLocalesFromWsQuery, GetAvailableLocalesFromWsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAvailableLocalesFromWsQuery, GetAvailableLocalesFromWsQueryVariables>(
    GetAvailableLocalesFromWsDocument,
    options
  )
}
export function useGetAvailableLocalesFromWsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAvailableLocalesFromWsQuery, GetAvailableLocalesFromWsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAvailableLocalesFromWsQuery, GetAvailableLocalesFromWsQueryVariables>(
    GetAvailableLocalesFromWsDocument,
    options
  )
}
export type GetAvailableLocalesFromWsQueryHookResult = ReturnType<typeof useGetAvailableLocalesFromWsQuery>
export type GetAvailableLocalesFromWsLazyQueryHookResult = ReturnType<typeof useGetAvailableLocalesFromWsLazyQuery>
export type GetAvailableLocalesFromWsQueryResult = Apollo.QueryResult<
  GetAvailableLocalesFromWsQuery,
  GetAvailableLocalesFromWsQueryVariables
>
