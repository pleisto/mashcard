import { theme, styled } from '@brickdoc/design-system'
import { Link } from 'react-router-dom'

export const Warp = styled('div', {
  display: 'flex',
  alignItems: 'center'
})

export const Tip = styled('p', {
  margin: '0',
  fontSize: theme.fontSizes.subHeadline,
  color: theme.colors.white
})

export const Path = styled(Link, {
  color: theme.colors.typeSecondary,
  fontSize: theme.fontSizes.callout,
  lineHeight: '1.25rem',
  maxWidth: '150px',
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
  lineHeight: '1.25rem',
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
