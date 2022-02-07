import { NavLink } from 'react-router-dom'
import { styled, theme, prefix } from '@brickdoc/design-system'

export const SidebarWrapper = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  width: '270px',
  height: '100vh',
  padding: '56px 8px 32px 8px',
  justifyContent: 'space-between',
  '.actions>h1': {
    fontSize: theme.fontSizes.title4,
    lineHeight: '30px',
    marginBottom: '.5rem',
    marginLeft: '1rem'
  },
  '.actions>nav': {
    display: 'flex',
    flexDirection: 'column'
  },
  '& > footer': {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
})

export const MenuItem = styled(NavLink, {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0 13px',
  height: '3rem',
  marginBottom: theme.space.xxxs,
  color: theme.colors.typeThirdary,
  border: theme.borderStyles.overlaySecondary,
  borderColor: 'transparent',
  verticalAlign: 'middle',
  flexWrap: 'wrap',
  transition: `color 0.3s ${theme.transitions.easeIn}`,
  [`& > .${prefix}-icon`]: {
    marginRight: '4px'
  },
  '&.active, &:hover': {
    color: theme.colors.typePrimary,
    border: theme.borderStyles.overlaySecondary,
    backdropFilter: 'blur(40px)',
    textDecoration: 'none',
    borderRadius: '4px',
    include: ['treeSelected']
  },
  '&.active': {
    background: theme.colors.secondarySelected
  },
  '&:hover': {
    background: theme.colors.secondaryHover
  }
})
