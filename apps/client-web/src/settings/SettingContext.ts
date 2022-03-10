import { createContext, ReactElement } from 'react'
import { GetCurrentSpaceQuery } from '@/BrickdocGraphQL'

export interface SettingAction {
  key: string
  icon: ReactElement
}

export interface SettingsContextProps {
  space?: GetCurrentSpaceQuery['space']
  actions: SettingAction[]
}

export const SettingsContext = createContext<SettingsContextProps | null>(null)
