import { useTranslation, UseTranslationOptions, UseTranslationResponse } from 'react-i18next'

export function useSettingsI18n(ns: string[] = [], options?: UseTranslationOptions): UseTranslationResponse<string[]> {
  return useTranslation(['settings', ...ns], options)
}
