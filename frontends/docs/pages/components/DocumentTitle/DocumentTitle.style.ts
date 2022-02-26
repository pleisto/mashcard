import { css, theme, styled } from '@brickdoc/design-system'

export const maxWidth = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  maxWidth: 'var(--brd-editor-max-width)'
})

export const Actions = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
  opacity: 0
})

export const item = css({
  flexDirection: 'row',
  justifyContent: 'center',
  padding: '4px 6px !important',
  marginRight: 4,
  borderRadius: 4,
  border: 'none',
  fontSize: '14px',
  color: theme.colors.typeThirdary,

  '&:active, &:focus, &:hover': {
    background: theme.colors.backgroundPrimary
  }
})

export const icon = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.colors.typeThirdary,
  fontSize: theme.fontSizes.body,
  lineHeight: theme.lineHeights.body
})

export const name = css({
  color: theme.colors.typeThirdary,
  fontSize: theme.fontSizes.subHeadline,
  lineHeight: theme.lineHeights.subHeadline,
  marginLeft: 6
})

export const TitleWrapper = styled('div', {
  width: '100%',
  marginBottom: '3rem',
  padding: '0 5.5rem',
  fontSize: '2.5rem',
  marginTop: '4.25rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '&:hover': {
    [`${Actions}`]: {
      pointerEvents: 'unset',
      opacity: 1
    }
  }
})

export const titleRow = css({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: 60
})

export const popover = css({
  ':global(.brd-popover-arrow)': {
    display: 'none'
  },
  ':global(.brd-popover-inner-content)': {
    padding: 0,
    color: 'unset'
  }
})

export const input = css({
  fontSize: theme.fontSizes.title1,
  padding: '0px !important',
  input: {
    lineHeight: '54px',
    fontWeight: 600,
    border: 'none',
    padding: 0
  },
  background: 'none'
})
