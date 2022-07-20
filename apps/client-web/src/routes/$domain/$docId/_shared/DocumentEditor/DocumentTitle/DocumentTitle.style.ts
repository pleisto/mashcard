import { css, theme, styled } from '@mashcard/design-system'
import TextareaAutosize from '@mui/base/TextareaAutosize'

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

export const Textarea = styled(TextareaAutosize, {
  width: '100%',
  fontSize: theme.fontSizes.titlePage,
  padding: '0px !important',
  lineHeight: '54px',
  fontWeight: 600,
  border: 'none',
  background: 'unset',
  resize: 'none',
  outline: 'none',
  variants: {
    disabledVariant: {
      false: {},
      true: {
        cursor: 'not-allowed',
        color: theme.colors.typePrimary
      }
    }
  }
})

export const TitleRow = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
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
          [`${Textarea}`]: {
            lineHeight: '42px'
          }
        },
        [`${Textarea}`]: {
          textarea: {
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
