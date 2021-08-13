import { isEmpty } from 'lodash'
import { useImperativeQuery } from '@/common/hooks/index'
import {
  QueryEmailAvailableFromWsDocument,
  QueryEmailAvailableFromWsQuery as Query,
  QueryEmailAvailableFromWsQueryVariables as Variables
} from '@/BrickdocGraphQL'
import { FormRuleRender } from '@brickdoc/design-system'

export const useEmailAvailableValidator = (): FormRuleRender => {
  const queryEmailAvailable = useImperativeQuery<Query, Variables>(QueryEmailAvailableFromWsDocument)
  return () => ({
    validator: async (_, value) => {
      if (isEmpty(value)) {
        return
      }
      const { message, success } = (await queryEmailAvailable({ email: value })).data.emailAvailable
      success ? await Promise.resolve() : await Promise.reject(new Error(message))
    }
  })
}
