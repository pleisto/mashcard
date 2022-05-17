import { gql } from 'graphql-tag'
import type { ApolloServerBase } from 'apollo-server-core'
import { useAppInstanceWithGraphQL } from '../../../common/testing'

describe('MetadataResolver', () => {
  let apollo: ApolloServerBase<any>
  const instance = useAppInstanceWithGraphQL()

  beforeAll(async () => {
    apollo = (await instance)()[0]
  })

  it('should return metadata', async () => {
    const query = gql`
      query {
        metadata {
          exposedSettings
          supportedLocales {
            language
            tag
          }
        }
      }
    `
    const result = await apollo.executeOperation({ query })
    expect(result.errors).toBeUndefined()
    expect(result.data?.metadata?.exposedSettings).toHaveProperty(['core.defaultLanguage'])
    expect(result.data?.metadata?.supportedLocales?.length).toBeGreaterThanOrEqual(1)
  })
})
