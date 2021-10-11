import { GetBlockSearchQuery as Query, GetBlockSearchQueryVariables as Variables, GetBlockSearchDocument } from '@/BrickdocGraphQL'
import { useImperativeQuery } from '@/common/hooks'

export function useBlockSearch(): (webid: string, input: string) => any {
  const queryBlockSearch = useImperativeQuery<Query, Variables>(GetBlockSearchDocument)

  return async (webid: string, input: string) => {
    const { data } = await queryBlockSearch({ webid, input })

    return data.blockSearch ?? []
  }
}
