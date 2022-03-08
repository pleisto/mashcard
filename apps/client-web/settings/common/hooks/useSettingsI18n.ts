import { useTranslation, UseTranslationOptions, UseTranslationResponse } from 'react-i18next'

export function useSettingsI18n(
  ns: string[] = [],
  options?: UseTranslationOptions
): UseTranslationResponse<string[], undefined> {
  return useTranslation<string[]>(['settings', ...ns], options)
}
