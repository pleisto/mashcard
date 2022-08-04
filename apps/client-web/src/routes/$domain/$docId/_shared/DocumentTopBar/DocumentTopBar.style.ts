import { theme, styled, keyframes } from '@mashcard/design-system'

export const LogoIcon = styled('img', {
  height: '22px',
  width: '84px',
  margin: '1rem',
  display: 'none'
})

export const LogoIconTry = styled('img', {
  height: '24px',
  width: '125px',
  margin: '16px 0',
  display: 'block'
})

export const Menu = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: theme.fontSizes.subHeadline,
  ':global(.mc-tooltip-disabled-compatible-wrapper)': {
    padding: 0
  }
})

export const itemStyle = {
  padding: 8,
  color: theme.colors.typeSecondary,
  height: 'auto',
  borderRadius: 4,
  fontSize: '1.25rem',
  lineHeight: '1.25rem',
  flexShrink: 0,
  '&:hover': {
    background: theme.colors.secondaryHover
  }
}

export const hiddenItemStyle = {
  ...itemStyle,
  '@mdDown': {
    display: 'none'
  }
}

export const Item = styled('div', itemStyle)

export const HiddenItem = styled('div', {
  ...itemStyle,
  '@mdDown': {
    display: 'none'
  }
})

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' }
})

export const LoadingIcon = styled('img', {
  width: 11,
  height: 11,
  animation: `${spin} infinite linear 800ms`,
  marginRight: 7
})

export const Loading = styled('div', {
  display: 'flex',
  color: theme.colors.deepPurple3,
  fontSize: theme.fontSizes.callout,
  lineHeight: theme.lineHeights.callout,
  margin: '0 0.4rem',
  alignItems: 'center',
  opacity: 0,
  variants: {
    isSaving: {
      true: {
        opacity: 1
      }
    }
  }
})

export const TopBar = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '3.5rem',
  overflow: 'hidden',
  flexShrink: 0,
  variants: {
    width: {
      md: {
        [`${LogoIcon}`]: {
          display: 'unset'
        }
      },
      sm: {
        [`${LogoIcon}`]: {
          display: 'unset'
        }
      }
    }
  }
})
