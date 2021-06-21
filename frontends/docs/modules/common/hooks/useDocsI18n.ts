import {
  useTranslation,
  UseTranslationOptions
} from "react-i18next"

export const useDocsI18n = (ns:string[]=[], options?: UseTranslationOptions) => {
  return useTranslation(["docs", ...ns], options)
}
