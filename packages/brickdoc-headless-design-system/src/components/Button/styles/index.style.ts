import { theme, css } from '../../../themes'
import { size } from './size.style'
import { state } from './state.style'
import { btnType } from './types.style'

export const buttonStyle = css({
  include: ['flexCenter'],
  lineHeight: theme.space.xxl,
  display: 'inline-flex',
  margin: 0,
  cursor: 'pointer',
  userSelect: 'none',
  border: 'none',
  borderRadius: theme.space.xxs,
  paddingLeft: theme.space.xl,
  paddingRight: theme.space.xl,
  paddingTop: theme.space.xs,
  paddingBottom: theme.space.xs,
  fontWeight: '400',
  outline: 'none',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
  touchAction: 'manipulation',
  transition: `all .2s cubic-bezier(0.00, 0.00, 0.58, 1.00)`,
  isolation: 'isolation',
  '&:focus-visible': {
    include: ['focusOutline']
  },
  variants: {
    btnType,
    size,
    ...state
  }
})
