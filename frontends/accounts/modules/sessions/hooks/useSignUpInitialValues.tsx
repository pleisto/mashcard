import { useState, useContext } from "react"
import { BrickdocContext } from "@/common/PWAProvider"

export const useSignUpInitialValues = ()=>{
  const [fill, setFill] = useState( {})
  const {locale, timezone } = useContext(BrickdocContext)

  return {
    initialValues: {
      ...fill,
      locale,
      timezone
    },
    setFill
  }

}
