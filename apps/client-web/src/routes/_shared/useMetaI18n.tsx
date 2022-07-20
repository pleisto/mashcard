import { useTranslation, UseTranslationOptions, UseTranslationResponse } from 'react-i18next'

export function useMetaI18n(ns: string[] = [], options?: UseTranslationOptions): UseTranslationResponse<string[]> {
  return useTranslation(['meta', ...ns], options)
}
