import { prefix, theme, styled } from '@brickdoc/design-system'
import { motion } from 'framer-motion'

export const ActionsGroup = styled('div', {
  position: 'relative',
  height: '2rem',
  button: {
    position: 'absolute',
    right: 0,
    top: 8
  }
})

export const selectStyle = {
  display: 'flex',
  flexShrink: 0,
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

export const MenuItem = styled(motion.li, {
  justifyContent: 'space-between',
  alignItems: 'center !important',
  minHeight: '3rem !important',
  minWidth: '316px !important',
  padding: '8px 16px !important',

  [`& .${prefix}-icon`]: {
    transition: `all .2s ${theme.transitions.easeOut}`,
    color: theme.colors.iconThirdary,
    opacity: 0
  },
  [`& .${prefix}-icon-check`]: {
    marginLeft: 13,
    color: theme.colors.iconPrimary,
    opacity: 1
  },
  '&:hover': {
    [`& .${prefix}-icon`]: {
      opacity: 1
    },
    [`&  .action-check`]: {
      opacity: 0
    }
  },
  '&:last-child': {
    marginBottom: 8
  }
})

export const actionStyle = {
  fontWeight: '500 !important',
  margin: '9px 0'
}

export const logoutStyle = {
  ...actionStyle,
  marginBottom: 13
}

export const MenuLabel = styled(motion.small, {
  fontSize: theme.fontSizes.subHeadline,
  lineHeight: theme.lineHeights.subHeadline,
  color: theme.colors.typeSecondary,
  fontWeight: 600,
  marginBottom: 8,
  marginTop: 4,
  padding: '8px 16px'
})
