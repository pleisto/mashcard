import { useGraphQLTestingInstance } from '../../../common/testing'
import { gql } from 'graphql-tag'
describe('MetadataResolver', () => {
  const getInstance = useGraphQLTestingInstance()

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
    const [apollo] = (await getInstance)()
    const result = await apollo.executeOperation({ query })
    expect(result.errors).toBeUndefined()
    expect(result.data?.metadata?.exposedSettings).toHaveProperty(['core.defaultLanguage'])
    expect(result.data?.metadata?.supportedLocales?.length).toBeGreaterThanOrEqual(1)
  })
})
