import { isEmpty } from "lodash"
import { useImperativeQuery } from "@/common/hooks/index"
import {
  QueryWebidAvailableFromWsDocument,
  QueryWebidAvailableFromWsQuery as Query,
  QueryWebidAvailableFromWsQueryVariables as Variables
} from "@/BrickdocGraphQL"
import { useTranslation } from "react-i18next"

export const useWebidAvailableValidator = ()=> {
  const { t } = useTranslation('errors')
  const queryWebidAvailable = useImperativeQuery<Query, Variables>(QueryWebidAvailableFromWsDocument)
  return ()=>({
    validator: async(_, value)=> {
      if(isEmpty(value)){return}
      const isAvailable = (await queryWebidAvailable({ webid: value })).data.webidAvailable
      isAvailable ? await Promise.resolve():await Promise.reject(new Error(t('messages.is_not_valid_webid',{
        webid: value
      })))
    }
  })
}
