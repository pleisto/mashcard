import React from 'react'
import { MenuStateReturn, MenuBarStateReturn } from 'reakit/Menu'
import { MenuProps } from './menu'

export const MenuContext = React.createContext<MenuStateReturn | MenuBarStateReturn | undefined>(undefined)
export const MenuActionContext = React.createContext<MenuProps['onAction']>(undefined)
