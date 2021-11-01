import { useTranslation, UseTranslationOptions, UseTranslationResponse } from 'react-i18next'

export function useDocsI18n(ns: string[] = [], options?: UseTranslationOptions): UseTranslationResponse<string[], undefined> {
  return useTranslation<string[]>(['docs', ...ns], options)
}
