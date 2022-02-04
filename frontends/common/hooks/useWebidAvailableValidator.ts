import { isEmpty } from 'lodash-es'
import { useImperativeQuery } from '@/common/hooks/index'
import {
  QueryWebidAvailableFromWsDocument,
  QueryWebidAvailableFromWsQuery as Query,
  QueryWebidAvailableFromWsQueryVariables as Variables
} from '@/BrickdocGraphQL'
import { TestConfig } from 'yup'

export const useWebidAvailableValidator = (): TestConfig => {
  const queryWebidAvailable = useImperativeQuery<Query, Variables>(QueryWebidAvailableFromWsDocument)
  return {
    name: 'webidAvailable',
    test: async (value, ctx) => {
      if (isEmpty(value)) {
        return false
      }
      const { success, message } = (await queryWebidAvailable({ webid: value as string })).data.webidAvailable
      return success ? true : ctx.createError({ message: `${value} ${message}` })
    }
  }
}
