import React from 'react'

export interface MenuContextData {
  onAction?: (key: string) => void
}

export const MenuContext = React.createContext<MenuContextData>({})
