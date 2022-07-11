import { useTranslation, UseTranslationOptions, UseTranslationResponse } from 'react-i18next'

export function useFormulaI18n(ns: string[] = [], options?: UseTranslationOptions): UseTranslationResponse<string[]> {
  return useTranslation(['formula', ...ns], options)
}
