import { KeyboardEventHandler, KeyboardEvent } from 'react'

/**
 * A hooks that returns a function that handles the press enter event.
 * @param onPressEnter A function that will be called when the user presses enter.
 * @param onKeyDown A function that will be called when the user presses a any key.
 * @returns
 */
export const usePressEnterHandler = <T = HTMLElement>(
  onPressEnter?: KeyboardEventHandler<T>,
  onKeyDown?: KeyboardEventHandler<T>
): KeyboardEventHandler<T> => {
  if (onPressEnter === undefined) {
    return onKeyDown === undefined ? () => {} : onKeyDown
  } else {
    return (event: KeyboardEvent<T>): void => {
      if (onPressEnter && event.key === 'Enter') onPressEnter(event)
      if (onKeyDown) onKeyDown(event)
    }
  }
}
