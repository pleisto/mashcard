import { isEmpty } from 'lodash'
import { useImperativeQuery } from '@/common/hooks/index'
import {
  QueryPasswordAvailableFromWsDocument,
  QueryPasswordAvailableFromWsQuery as Query,
  QueryPasswordAvailableFromWsQueryVariables as Variables
} from '@/BrickdocGraphQL'
import { FormRuleRender } from '@brickdoc/design-system'

export const usePasswordAvailableValidator = (): FormRuleRender => {
  const queryPasswordAvailable = useImperativeQuery<Query, Variables>(QueryPasswordAvailableFromWsDocument)
  return () => ({
    validator: async (_, value) => {
      if (isEmpty(value)) {
        return
      }
      const { message, success } = (await queryPasswordAvailable({ password: value })).data.passwordAvailable
      success ? await Promise.resolve() : await Promise.reject(message)
    }
  })
}
