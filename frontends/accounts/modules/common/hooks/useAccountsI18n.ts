import {
  useTranslation,
  UseTranslationOptions
} from "react-i18next"

export const useAccountsI18n = (ns:string[]=[], options?: UseTranslationOptions) => {
  return useTranslation(["accounts","devise", ...ns], options)
}
