import { useEffect, useState } from 'react'
import { BrickdocEventBus, BlockJustCreated } from '@brickdoc/schema'

export function usePopoverVisible(id: string): [boolean, (visible: boolean) => void] {
  const [popoverVisible, setPopoverVisible] = useState(false)
  const handlePopoverVisibleChange = (visible: boolean): void => setPopoverVisible(visible)

  useEffect(() => {
    const listener = BrickdocEventBus.subscribe(
      BlockJustCreated,
      () => {
        setPopoverVisible(true)
      },
      { eventId: id }
    )

    return () => listener.unsubscribe()
  }, [id])

  return [popoverVisible, handlePopoverVisibleChange]
}
