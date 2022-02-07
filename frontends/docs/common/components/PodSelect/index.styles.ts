import { prefix, theme } from '@brickdoc/design-system'
export const selectStyle = {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '.25rem 1rem',
  [`&>${prefix}-icon`]: {
    color: theme.colors.typeSecondary
  },
  '&:hover': {
    cursor: 'pointer',
    background: theme.colors.black_3p
  }
}

export const menuItemStyle = {
  justifyContent: 'space-between',
  alignItems: 'center !important',
  fontWeight: '500 !important',
  minHeight: '3rem !important'
}
