import { isEmpty } from '@mashcard/active-support'
import { useImperativeQuery } from '@/common/hooks/index'
import {
  QueryDomainAvailableFromWsDocument,
  QueryDomainAvailableFromWsQuery as Query,
  QueryDomainAvailableFromWsQueryVariables as Variables
} from '@/MashcardGraphQL'
import { TestConfig } from 'yup'

export const useDomainAvailableValidator = (): TestConfig => {
  const queryDomainAvailable = useImperativeQuery<Query, Variables>(QueryDomainAvailableFromWsDocument)
  return {
    name: 'domainAvailable',
    test: async (value, ctx) => {
      if (isEmpty(value)) {
        return false
      }
      const { success, message } = (await queryDomainAvailable({ domain: value as string })).data.domainAvailable
      return success ? true : ctx.createError({ message: `${value} ${message}` })
    }
  }
}
