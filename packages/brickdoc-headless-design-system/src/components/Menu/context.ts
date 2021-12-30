import React from 'react'
import { MenuStateReturn, MenuBarStateReturn } from 'reakit/Menu'
import { MenuProps } from './menu'

export const MenuContext = React.createContext<MenuStateReturn | MenuBarStateReturn>(null)
export const MenuActionContext = React.createContext<MenuProps['onAction']>(null)
