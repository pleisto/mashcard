import { prefix, theme, styled } from '@brickdoc/design-system'

export const ActionsGroup = styled('div', {
  [`& .${prefix}-icon`]: {
    display: 'none',
    color: theme.colors.iconThirdary
  },
  [`& .${prefix}-icon-check`]: {
    marginLeft: 13,
    color: theme.colors.iconPrimary,
    display: 'block'
  }
})

export const selectStyle = {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '.75rem .75rem',
  [`& .${prefix}-icon-change`]: {
    fontSize: '1.25rem',
    color: theme.colors.iconThirdary
  },
  '&:hover': {
    cursor: 'pointer',
    background: theme.colors.black_3p
  }
}

export const menuItemStyle = {
  justifyContent: 'space-between',
  alignItems: 'center !important',
  minHeight: '3rem !important',
  minWidth: '316px !important',
  padding: '8px 16px !important',
  '&:last-child': {
    marginBottom: 8
  },
  '&:hover': {
    [`& .${prefix}-icon`]: {
      display: 'block'
    }
  }
}

export const actionStyle = {
  fontWeight: '500 !important',
  margin: '9px 0'
}

export const logoutStyle = {
  ...actionStyle,
  marginBottom: 13
}

export const MenuLabel = styled('small', {
  fontSize: theme.fontSizes.subHeadline,
  lineHeight: theme.lineHeights.subHeadline,
  color: theme.colors.typeSecondary,
  fontWeight: 600,
  marginBottom: 8,
  marginTop: 4,
  padding: '8px 16px'
})
