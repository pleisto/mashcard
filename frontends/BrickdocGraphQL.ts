import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A valid http/https url or image uri */
  HttpUrl: any
}

/** Available authentication authentication. */
export enum AuthMethod {
  /** Email and Password Authentication */
  EmailPassword = 'email_password',
  /** Github Federated Authentication */
  Github = 'github'
}

export type RootQuery = {
  __typename?: 'RootQuery'
  /** Check webid available. */
  accountsWebidAvailable: Scalars['Boolean']
  /** Return information about current Brickdoc server instance. */
  metadata: Metadata
}

export type RootQueryAccountsWebidAvailableArgs = {
  webid: Scalars['String']
}

/** Brickdoc Global Configuration */
export type Config = {
  __typename?: 'config'
  /** Enable email and password authentication */
  accountsEmailPasswordAuth: Scalars['Boolean']
  /** Enabled federated identity providers */
  accountsFederatedProviders: Array<FederatedProvider>
  /** Preferred Authentication authentication */
  accountsPreferredAuthMethod: AuthMethod
  /** User agreement link */
  userAgreementLink: Scalars['HttpUrl']
}

/** Accounts Federated Identity Provide Configuration */
export type FederatedProvider = {
  __typename?: 'federatedProvider'
  /** Provider Logo URI */
  logo: Scalars['HttpUrl']
  /** Provider Name */
  name: Scalars['String']
}

/** Represents information about the Brickdoc Server Instance. */
export type Metadata = {
  __typename?: 'metadata'
  /** Current available locales. */
  availableLocales: Array<Select_Option>
  /** Brickdoc Global Config */
  config: Config
  id: Scalars['ID']
}

/** Option Object for BrickDesign Select Component. */
export type Select_Option = {
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

export type GetAccountsConfigFromWsQueryVariables = Exact<{ [key: string]: never }>

export type GetAccountsConfigFromWsQuery = { __typename?: 'RootQuery' } & {
  metadata: { __typename?: 'metadata' } & Pick<Metadata, 'id'> & {
      config: { __typename?: 'config' } & Pick<
        Config,
        'userAgreementLink' | 'accountsPreferredAuthMethod' | 'accountsEmailPasswordAuth'
      > & { accountsFederatedProviders: Array<{ __typename?: 'federatedProvider' } & Pick<FederatedProvider, 'name' | 'logo'>> }
    }
}

export type QueryAccountWebidAvailableFromWsQueryVariables = Exact<{
  webid: Scalars['String']
}>

export type QueryAccountWebidAvailableFromWsQuery = { __typename?: 'RootQuery' } & Pick<RootQuery, 'accountsWebidAvailable'>

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
export const GetAccountsConfigFromWsDocument = gql`
  query GetAccountsConfigFromWS {
    metadata {
      id
      config {
        userAgreementLink
        accountsPreferredAuthMethod
        accountsEmailPasswordAuth
        accountsFederatedProviders {
          name
          logo
        }
      }
    }
  }
`

/**
 * __useGetAccountsConfigFromWsQuery__
 *
 * To run a query within a React component, call `useGetAccountsConfigFromWsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountsConfigFromWsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountsConfigFromWsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAccountsConfigFromWsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAccountsConfigFromWsQuery, GetAccountsConfigFromWsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAccountsConfigFromWsQuery, GetAccountsConfigFromWsQueryVariables>(GetAccountsConfigFromWsDocument, options)
}
export function useGetAccountsConfigFromWsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAccountsConfigFromWsQuery, GetAccountsConfigFromWsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAccountsConfigFromWsQuery, GetAccountsConfigFromWsQueryVariables>(GetAccountsConfigFromWsDocument, options)
}
export type GetAccountsConfigFromWsQueryHookResult = ReturnType<typeof useGetAccountsConfigFromWsQuery>
export type GetAccountsConfigFromWsLazyQueryHookResult = ReturnType<typeof useGetAccountsConfigFromWsLazyQuery>
export type GetAccountsConfigFromWsQueryResult = Apollo.QueryResult<GetAccountsConfigFromWsQuery, GetAccountsConfigFromWsQueryVariables>
export const QueryAccountWebidAvailableFromWsDocument = gql`
  query QueryAccountWebidAvailableFromWS($webid: String!) {
    accountsWebidAvailable(webid: $webid)
  }
`

/**
 * __useQueryAccountWebidAvailableFromWsQuery__
 *
 * To run a query within a React component, call `useQueryAccountWebidAvailableFromWsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryAccountWebidAvailableFromWsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryAccountWebidAvailableFromWsQuery({
 *   variables: {
 *      webid: // value for 'webid'
 *   },
 * });
 */
export function useQueryAccountWebidAvailableFromWsQuery(
  baseOptions: Apollo.QueryHookOptions<QueryAccountWebidAvailableFromWsQuery, QueryAccountWebidAvailableFromWsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<QueryAccountWebidAvailableFromWsQuery, QueryAccountWebidAvailableFromWsQueryVariables>(
    QueryAccountWebidAvailableFromWsDocument,
    options
  )
}
export function useQueryAccountWebidAvailableFromWsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<QueryAccountWebidAvailableFromWsQuery, QueryAccountWebidAvailableFromWsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<QueryAccountWebidAvailableFromWsQuery, QueryAccountWebidAvailableFromWsQueryVariables>(
    QueryAccountWebidAvailableFromWsDocument,
    options
  )
}
export type QueryAccountWebidAvailableFromWsQueryHookResult = ReturnType<typeof useQueryAccountWebidAvailableFromWsQuery>
export type QueryAccountWebidAvailableFromWsLazyQueryHookResult = ReturnType<typeof useQueryAccountWebidAvailableFromWsLazyQuery>
export type QueryAccountWebidAvailableFromWsQueryResult = Apollo.QueryResult<
  QueryAccountWebidAvailableFromWsQuery,
  QueryAccountWebidAvailableFromWsQueryVariables
>
