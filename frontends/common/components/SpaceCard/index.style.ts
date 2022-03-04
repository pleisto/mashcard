import { theme, styled } from '@brickdoc/design-system'

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 12,
  fontSize: '1rem',
  fontWeight: 600
})

export const AvatarWrapper = styled('div', {})

export const Name = styled('span', {
  fontSize: theme.fontSizes.subHeadline,
  lineHeight: theme.lineHeights.subHeadline,
  color: theme.colors.typePrimary,
  fontWeight: 400
})

export const Email = styled('span', {
  fontSize: theme.fontSizes.callout,
  lineHeight: theme.lineHeights.callout,
  color: theme.colors.typeSecondary,
  fontWeight: 400
})

export const Card = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: '2rem',
  variants: {
    size: {
      sm: {
        [`${Content}`]: {
          marginLeft: 8
        },
        [`${Name}`]: {
          fontSize: theme.fontSizes.body,
          lineHeight: theme.lineHeights.body,
          fontWeight: 600
        }
      },
      md: {
        [`${Name}`]: {
          fontWeight: 500
        }
      }
    }
  }
})
