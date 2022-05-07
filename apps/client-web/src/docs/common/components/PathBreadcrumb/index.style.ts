import { theme, styled } from '@brickdoc/design-system'
import { Link } from 'react-router-dom'

export const Tip = styled('p', {
  margin: '0',
  fontSize: theme.fontSizes.subHeadline,
  color: theme.colors.white
})

export const Path = styled('div', {
  color: theme.colors.typeSecondary,
  fontSize: theme.fontSizes.callout,
  lineHeight: '1.25rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '&:hover': {
    color: theme.colors.typeSecondary,
    textDecoration: 'none'
  }
})

export const Emoji = styled('span', {
  fontSize: '1.25rem',
  lineHeight: '1.5rem',
  marginRight: '4px',
  variants: {
    show: {
      true: {
        display: 'unset'
      },
      false: {
        display: 'none'
      }
    }
  }
})

export const Warp = styled(Link, {
  display: 'flex',
  alignItems: 'center',
  minWidth: 0,
  maxWidth: '25rem',
  '&:hover': {
    textDecoration: 'none'
  }
})

export const Split = styled('span', {
  color: theme.colors.typeSecondary,
  fontSize: theme.fontSizes.callout,
  lineHeight: theme.lineHeights.callout,
  margin: '0 4px',
  variants: {
    show: {
      true: {
        display: 'unset'
      },
      false: {
        display: 'none'
      }
    }
  }
})
