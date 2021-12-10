import { theme } from '../../../themes'
import { size } from './size.style'
import { state } from './state.style'
import { type } from './types.style'

export const baseStyles = {
  lineHeight: theme.space.xxl,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
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
  transition: `all .3s ${theme.transitions.easeInOut}`
}

export const variants = {
  type,
  size,
  ...state
}
