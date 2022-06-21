import { useCallback } from 'react'
import { MashcardEventBus, SlashMenuHide, ExplorerMenuTrigger } from '@mashcard/schema'

export function useShowExplorerMenu(): [VoidFunction] {
  const handleShowExplorerMenu = useCallback(() => {
    MashcardEventBus.dispatch(SlashMenuHide({}))
    MashcardEventBus.dispatch(ExplorerMenuTrigger({ visible: true }))
  }, [])

  return [handleShowExplorerMenu]
}
