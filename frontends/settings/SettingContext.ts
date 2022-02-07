import { createContext, ReactElement } from 'react'
import { GetCurrentPodQuery } from '@/BrickdocGraphQL'

export interface SettingAction {
  key: string
  icon: ReactElement
}

export interface SettingsContextProps {
  pod?: GetCurrentPodQuery['pod']
  actions: SettingAction[]
}

export const SettingsContext = createContext<SettingsContextProps | null>(null)
