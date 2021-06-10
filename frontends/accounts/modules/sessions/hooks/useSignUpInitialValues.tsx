import { useState, useContext } from "react"
import { BrickdocContext } from "@/common/PWAProvider"
import { isEmpty } from 'lodash'

export const useSignUpInitialValues = (autofill: object|undefined)=>{
  const [fill] = useState(autofill || {})
  const {locale, timezone } = useContext(BrickdocContext)
  const hasFilled = !isEmpty(fill)

  return {
    initialValues: {
      ...fill,
      locale,
      timezone
    },
    hasFilled
  }

}
