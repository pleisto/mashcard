import { HTMLAttributes, forwardRef, ForwardRefRenderFunction } from 'react'
import { styled } from '../../themes'

export interface VisuallyHiddenProps extends Omit<HTMLAttributes<HTMLDivElement>, 'css'> {}

/**
 * @see https://www.w3.org/WAI/tutorials/forms/labels/#note-on-hiding-elements
 */
const VisualHiddenWrapper = styled('div', {
  borderWidth: '0 !important',
  clip: 'rect(1px, 1px, 1px, 1px) !important',
  height: '1px !important',
  overflow: 'hidden !important',
  padding: '0 !important',
  position: 'absolute !important',
  whiteSpace: 'nowrap !important',
  width: '1px !important'
})

const VisuallyHidden: ForwardRefRenderFunction<HTMLDivElement, VisuallyHiddenProps> = (props, ref) => (
  <VisualHiddenWrapper {...props} ref={ref} />
)

const _VisuallyHidden = forwardRef(VisuallyHidden)
_VisuallyHidden.displayName = 'VisuallyHidden'
export { _VisuallyHidden as VisuallyHidden }
