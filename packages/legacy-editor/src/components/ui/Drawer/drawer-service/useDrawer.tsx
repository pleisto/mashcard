import { useCallback } from 'react'
import { DrawerView, useDrawerStore } from './store'

export interface UseDrawerReturn {
  visible: boolean
  open: () => void
  close: () => void
  setVisible: (visible: boolean) => void
}

/**
 * Returns a set of action functions to control the drawer of a specific `view`.
 */
export const useDrawer = (view: DrawerView): UseDrawerReturn => {
  const { state, open: openDrawer, close } = useDrawerStore()
  const visible = state === view
  const open = useCallback(() => {
    openDrawer(view)
  }, [openDrawer, view])
  const setVisible = useCallback(
    (visible: boolean) => {
      visible ? open() : close()
    },
    [open, close]
  )
  return {
    visible,
    open,
    close,
    setVisible
  }
}
