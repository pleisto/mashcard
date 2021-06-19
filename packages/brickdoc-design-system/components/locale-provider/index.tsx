import * as React from 'react'
import { ValidateMessages } from 'rc-field-form/lib/interface'
import { useTranslation } from 'react-i18next'

import { ModalLocale, changeConfirmLocale } from '../modal/locale'
import { TransferLocale as TransferLocaleForEmpty } from '../empty'
import { PaginationLocale } from '../pagination/Pagination'
import { TableLocale } from '../table/interface'
import { PopconfirmLocale } from '../popconfirm'
import { PickerLocale } from '../date-picker/generatePicker'
import LocaleContext from './context'
import { getLocaleData } from './localeData'
import { TimePickerLocale } from '../time-picker'

export const ANT_MARK = 'internalMark'

export interface Locale {
  Pagination?: PaginationLocale
  DatePicker?: PickerLocale
  TimePicker?: TimePickerLocale
  Calendar?: PickerLocale
  Table?: TableLocale
  Modal?: ModalLocale
  Popconfirm?: PopconfirmLocale
  Transfer?: unknown
  Select?: Record<string, any>
  Empty?: TransferLocaleForEmpty
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

  return <LocaleContext.Provider value={{ ...locale, exist: true }}>{children}</LocaleContext.Provider>
}

export default LocaleProvider
