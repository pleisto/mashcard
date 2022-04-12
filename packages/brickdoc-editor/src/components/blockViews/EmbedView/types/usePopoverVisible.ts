import { useCallback, useState } from 'react'
import { useBlockJustCreated } from './useBlockJustCreated'

export function usePopoverVisible(id: string): [boolean, (visible: boolean) => void] {
  const [popoverVisible, setPopoverVisible] = useState(false)
  const handlePopoverVisibleChange = (visible: boolean): void => setPopoverVisible(visible)
  const markPopoverVisibleTrue = useCallback(() => {
    setPopoverVisible(true)
  }, [])

  useBlockJustCreated(id, markPopoverVisibleTrue)

  return [popoverVisible, handlePopoverVisibleChange]
}
