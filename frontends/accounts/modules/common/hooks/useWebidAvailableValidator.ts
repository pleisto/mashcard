import { isEmpty } from "lodash"
import { useImperativeQuery } from "@/common/hooks"
import {
  QueryAccountWebidAvailableFromWsDocument,
  QueryAccountWebidAvailableFromWsQuery as Query,
  QueryAccountWebidAvailableFromWsQueryVariables as Variables
} from "@/BrickdocGraphQL"

export const useWebidAvailableValidator = ()=> {
  const queryWebidAvailable = useImperativeQuery<Query, Variables>(QueryAccountWebidAvailableFromWsDocument)
  return ()=>({
    validator: async(_, value)=> {
      if(isEmpty(value)){return}
      const isAvailable = (await queryWebidAvailable({ webid: value })).data.accountsWebidAvailable
      isAvailable ? await Promise.resolve():await Promise.reject(new Error(`${value} is not available pod name`))
    }
  })
}
