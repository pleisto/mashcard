import { useEffect } from 'react'
import { BlockJustCreated, MashcardEventBus } from '@mashcard/schema'

export function useBlockJustCreated(id: string, callback: () => void): void {
  useEffect(() => {
    const listener = MashcardEventBus.subscribe(BlockJustCreated, () => callback(), { eventId: id })

    return () => listener.unsubscribe()
  }, [callback, id])
}
