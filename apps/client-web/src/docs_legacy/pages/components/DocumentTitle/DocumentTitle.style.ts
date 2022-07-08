import { css, theme, styled, Input as input } from '@mashcard/design-system'

export const MaxWidth = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  maxWidth: 'var(--mc-editor-max-width)'
})

export const Actions = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
  opacity: 0
})

export const Item = styled('div', {
  flexDirection: 'row',
  justifyContent: 'center',
  padding: '4px 6px !important',
  marginRight: 4,
  borderRadius: 4,
  border: 'none',
  fontSize: '14px'
})

export const Icon = styled('span', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.colors.typeThirdary,
  fontSize: theme.fontSizes.body,
  lineHeight: theme.lineHeights.body
})

export const Name = styled('span', {
  color: theme.colors.typeThirdary,
  fontSize: theme.fontSizes.subHeadline,
  lineHeight: theme.lineHeights.subHeadline,
  marginLeft: 6
})

export const TitleRow = styled('div', {
  display: 'flex',
  alignItems: 'center',
  width: '100%'
})

export const popover = css({
  ':global(.mc-popover-arrow)': {
    display: 'none'
  },
  ':global(.mc-popover-inner-content)': {
    padding: 0,
    color: 'unset'
  }
})

export const Input = styled(input, {
  fontSize: theme.fontSizes.titlePage,
  padding: '0px !important',
  input: {
    lineHeight: '54px',
    fontSize: '2.5rem',
    fontWeight: 600,
    border: 'none',
    padding: 0
  },
  background: 'none',
  variants: {
    disabledVariant: {
      false: {},
      true: {
        cursor: 'not-allowed',
        color: theme.colors.typePrimary,
        background: 'none'
      }
    }
  }
})

export const TitleWrapper = styled('div', {
  width: '100%',
  marginBottom: '3rem',
  marginTop: '4.25rem',
  fontSize: '2.5rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 40px',

  '&:hover': {
    [`${Actions}`]: {
      pointerEvents: 'unset',
      opacity: 1
    }
  },
  variants: {
    width: {
      md: {},
      sm: {
        marginBottom: '3rem',
        margin: '24px 0',
        padding: '0 19px',
        [`${Actions}`]: {
          display: 'none'
        },
        [`${Item}`]: {
          height: '42px',
          w: '42px'
        },
        [`${TitleRow}`]: {
          height: '42px'
        },
        [`${Input}`]: {
          input: {
            fontSize: '26px',
            lineHeight: '32px'
          }
        }
      }
    }
  }
})

export const Popover = css({
  ':global(.mc-popover-arrow)': {
    display: 'none'
  },
  ':global(.mc-popover-inner-content)': {
    padding: 0,
    color: 'unset'
  }
})()
