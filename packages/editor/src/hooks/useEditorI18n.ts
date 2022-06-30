import { useTranslation, UseTranslationOptions, UseTranslationResponse } from 'react-i18next'

export function useEditorI18n(ns: string[] = [], options?: UseTranslationOptions): UseTranslationResponse<string[]> {
  return useTranslation(['editor', ...ns], options)
}
