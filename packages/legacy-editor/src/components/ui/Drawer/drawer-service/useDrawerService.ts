import { useEffect } from 'react'
import { useDrawerStore } from './store'

/**
 * Register the drawer service so that the components can
 * observe and control the editor drawer via `useDrawer()`
 */
export const useDrawerService = (): void => {
  const attach = useDrawerStore(service => service.attach)
  useEffect(() => attach(), [attach])
}
