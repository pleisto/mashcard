import { isEmpty } from 'lodash-es'
import { useImperativeQuery } from '@/common/hooks/index'
import {
  QueryWebidAvailableFromWsDocument,
  QueryWebidAvailableFromWsQuery as Query,
  QueryWebidAvailableFromWsQueryVariables as Variables
} from '@/BrickdocGraphQL'
import { DeprecatedFormRuleRender } from '@brickdoc/design-system'

export const useWebidAvailableValidator = (): DeprecatedFormRuleRender => {
  const queryWebidAvailable = useImperativeQuery<Query, Variables>(QueryWebidAvailableFromWsDocument)
  return () => ({
    validator: async (_, value) => {
      if (isEmpty(value)) {
        return
      }
      const { message, success } = (await queryWebidAvailable({ webid: value })).data.webidAvailable
      success ? await Promise.resolve() : await Promise.reject(new Error(message))
    }
  })
}
