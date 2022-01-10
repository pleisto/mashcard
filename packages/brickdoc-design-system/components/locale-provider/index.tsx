import * as React from 'react'
import { ValidateMessages } from 'rc-field-form/lib/interface'
import { useTranslation } from 'react-i18next'

import './style'
import { ModalLocale, changeConfirmLocale } from '../modal/locale'
// import { TransferLocale as TransferLocaleForEmpty } from '../empty'
import LocaleContext from './context'
import { getLocaleData } from './localeData'

export const ANT_MARK = 'internalMark'

export interface Locale {
  Modal?: ModalLocale
  Transfer?: unknown
  Select?: Record<string, any>
  global?: Record<string, any>
  PageHeader?: { back: string }
  Icon?: Record<string, any>
  Text?: Record<string, any>
  Form?: {
    optional?: string
    defaultValidateMessages: ValidateMessages
  }
  Image?: {
    preview: string
  }
}

const LocaleProvider: React.FC = ({ children }) => {
  const { t, i18n } = useTranslation('design_system')
  const locale = React.useMemo(() => getLocaleData(t, i18n.language), [i18n.language, t])

  React.useEffect(() => {
    changeConfirmLocale(locale?.Modal)
  }, [locale])

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <LocaleContext.Provider value={{ ...locale, exist: true }}>{children}</LocaleContext.Provider>
}

export default LocaleProvider
