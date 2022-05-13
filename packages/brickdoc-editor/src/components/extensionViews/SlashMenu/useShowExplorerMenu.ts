import { useCallback } from 'react'
import { BrickdocEventBus, SlashMenuHide, ExplorerMenuTrigger } from '@brickdoc/schema'

export function useShowExplorerMenu(): [VoidFunction] {
  const handleShowExplorerMenu = useCallback(() => {
    BrickdocEventBus.dispatch(SlashMenuHide({}))
    BrickdocEventBus.dispatch(ExplorerMenuTrigger({ visible: true }))
  }, [])

  return [handleShowExplorerMenu]
}
