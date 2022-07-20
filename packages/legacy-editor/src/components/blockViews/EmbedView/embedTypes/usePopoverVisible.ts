import { useCallback, useState } from 'react'
import { useBlockJustCreated } from './useBlockJustCreated'

export function usePopoverVisible(id: string): [boolean | undefined, (visible: boolean) => void] {
  const [popoverVisible, setPopoverVisible] = useState<boolean | undefined>()
  const handlePopoverVisibleChange = (visible: boolean): void => setPopoverVisible(visible)
  const markPopoverVisibleTrue = useCallback(() => {
    setTimeout(() => {
      setPopoverVisible(true)
    })
  }, [])

  useBlockJustCreated(id, markPopoverVisibleTrue)

  return [popoverVisible, handlePopoverVisibleChange]
}
