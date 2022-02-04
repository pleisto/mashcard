import * as React from 'react'

// import { TransferLocale as TransferLocaleForEmpty } from '../empty'
import LocaleContext from './context'

export const ANT_MARK = 'internalMark'

export type Locale = any

const LocaleProvider: React.FC = ({ children }) => {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <LocaleContext.Provider value={{}}>{children}</LocaleContext.Provider>
}

export default LocaleProvider
