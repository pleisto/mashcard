import { useEffect } from 'react'
import { BlockJustCreated, BrickdocEventBus } from '@brickdoc/schema'

export function useBlockJustCreated(id: string, callback: () => void): void {
  useEffect(() => {
    const listener = BrickdocEventBus.subscribe(BlockJustCreated, () => callback(), { eventId: id })

    return () => listener.unsubscribe()
  }, [callback, id])
}
