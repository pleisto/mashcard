import * as React from 'react'
import LocaleContext from './context'
import { Locale } from '.'

type LocaleComponent = keyof Locale

export function useLocale(): Locale
export function useLocale<T extends LocaleComponent>(componentName: T): Locale[T]
export function useLocale<T extends LocaleComponent>(componentName?: T): Locale | Locale[T] {
  const antLocale = React.useContext(LocaleContext)

  return React.useMemo<Locale | Locale[T]>(() => {
    if (!antLocale) {
      return {}
    }
    if (!componentName) return antLocale
    return antLocale[componentName]
  }, [componentName, antLocale])
}

export interface LocaleReceiverProps<C extends keyof Locale = keyof Locale> {
  componentName: C
  children: (locale: Exclude<Locale[C], undefined>) => React.ReactElement
}

function LocaleReceiver<C extends keyof Locale = keyof Locale>({ componentName, children }: LocaleReceiverProps<C>): React.ReactElement {
  const locale = useLocale(componentName)

  return children(locale as any)
}

export default LocaleReceiver
