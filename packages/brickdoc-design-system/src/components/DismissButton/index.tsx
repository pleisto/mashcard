import { FC } from 'react'
import { VisuallyHidden } from '../VisuallyHidden'

interface DismissButtonProps {
  /** Called when the dismiss button is activated. */
  onDismiss?: () => void
  label?: string
}
/**
 * DismissButton is a visually hidden button that can be used by screen reader users to
 * close an overlay in the absence of a visual dismiss button. This may typically be used
 * with a menu or a popover since they often forgo a visual dismiss button, instead allowing
 * users to use the Escape key to dismiss the menu or popover.
 *
 * {@link ../Popover/index.tsx | Example}
 */
export const DismissButton: FC<DismissButtonProps> = props => {
  const { onDismiss, label = 'Dismiss' } = props
  const onClick = (): void => {
    if (onDismiss) onDismiss()
  }

  return (
    <VisuallyHidden>
      <button tabIndex={-1} aria-label={label} onClick={onClick} />
    </VisuallyHidden>
  )
}
