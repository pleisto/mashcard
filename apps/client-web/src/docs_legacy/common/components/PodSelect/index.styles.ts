import { prefix, theme, styled } from '@mashcard/design-system'
import { motion } from 'framer-motion'

export const ActionsGroup = styled('div', {
  position: 'relative',
  height: '2rem',
  button: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)'
  }
})

export const selectStyle = {
  display: 'flex',
  flexShrink: 0,
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '.75rem 1rem',
  borderRadius: '4px 0 0 4px',
  [`& .${prefix}-icon-change`]: {
    fontSize: '1.25rem',
    color: theme.colors.iconThirdary
  },
  '&:hover': {
    cursor: 'pointer',
    background: theme.colors.secondaryHover
  }
}

export const SettingWrapper = styled('div', {
  height: '1.5rem',
  width: '1.5rem',
  textAlign: 'center',
  lineHeight: '1.5rem',
  borderRadius: 2,
  '&:hover': {
    background: theme.colors.thirdaryHover
  }
})

export const MenuItem = styled(motion.li, {
  justifyContent: 'space-between',
  alignItems: 'center !important',
  minHeight: '3rem !important',
  minWidth: '316px !important',
  padding: '10px 16px !important',

  [`& ${SettingWrapper.toString()}`]: {
    transition: `all .2s ${theme.transitions.easeOut}`,
    color: theme.colors.iconThirdary,
    display: 'none'
  },
  [`& .${prefix}-icon-check`]: {
    padding: 3,
    color: theme.colors.primaryDefault
  },
  '&:hover': {
    [`& ${SettingWrapper.toString()}`]: {
      display: 'unset'
    },
    [`&  .action-check`]: {
      display: 'none'
    }
  },
  '&:last-child': {
    marginBottom: 8
  }
})

export const actionStyle = {
  fontWeight: '500 !important',
  height: '3.25rem'
}

export const logoutStyle = {
  ...actionStyle
}

export const MenuLabel = styled(motion.small, {
  fontSize: theme.fontSizes.subHeadline,
  lineHeight: theme.lineHeights.subHeadline,
  color: theme.colors.typeSecondary,
  fontWeight: 600,
  marginTop: 4,
  padding: '9px 16px'
})
