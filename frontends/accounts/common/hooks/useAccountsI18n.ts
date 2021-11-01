import { useTranslation, UseTranslationOptions, UseTranslationResponse } from 'react-i18next'

export function useAccountsI18n(ns: string[] = [], options?: UseTranslationOptions): UseTranslationResponse<string[], undefined> {
  return useTranslation<string[]>(['accounts', 'devise', ...ns], options)
}
