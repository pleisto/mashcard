import { FocusRing as AriaFocusRIng } from '@react-aria/focus'
import { css } from '../../themes'

export type FocusRingProps = Parameters<typeof AriaFocusRIng>[0]

const focusRingStyle = css({ include: 'focusOutline' })

export const FocusRing: React.FC<FocusRingProps> = props => {
  const focusRingClass = [focusRingStyle(), props.focusRingClass].join(' ')
  return <AriaFocusRIng {...props} focusRingClass={focusRingClass} />
}
