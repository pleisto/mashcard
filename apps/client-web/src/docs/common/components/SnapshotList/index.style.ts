import { styled, css, theme } from '@brickdoc/design-system'

export const List = styled('ul', {
  listStyle: 'none',
  margin: 0,
  padding: 0
})

export const row = css({
  height: '70vh'
})()

const width = '220px'

export const container = css({
  display: 'flex',
  flexDirection: 'row',
  '--brd-editor-max-width': '100%',
  width: '100%',
  height: '100vh',

  '.contentWrapper': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: `calc(100% - ${width})`,
    overflowY: 'scroll'
  },

  '.side': {
    display: 'flex',
    borderLeft: '1px solid #f6f6f6',
    width: '@width',
    flexShrink: 0,
    flexDirection: 'column',

    '.actionPanel': {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px 16px',

      '&::before': {
        content: '',
        position: 'absolute',
        top: 0,
        left: '22px',
        right: '22px',
        height: '1px',
        background: '#f6f6f6'
      },

      'button + button': {
        marginTop: 8
      }
    }
  }
})()

export const listItem = css({
  '&:global(.brd-list-item)': {
    padding: 0
  }
})()

export const item = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  height: '46px',
  padding: '6px 16px',

  '.title': {
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: '500',
    maxWidth: '20em',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },

  '.desc': {
    fontSize: '12px',
    lineHeight: '16px',
    color: theme.colors.deepPurple3,
    maxWidth: '20em',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
})()

export const page = css({
  minHeight: 'unset',
  height: '100vh',
  overflowY: 'auto',
  width: '100%'
})()

export const snapshot = css({
  minHeight: 'unset',
  overflowY: 'auto',
  height: '100%'
})()

export const topBar = css({
  display: 'flex',
  alignItems: 'center',
  height: 48,
  padding: '0 24px',
  color: theme.colors.typeSecondary,
  fontSize: 14,
  lineHeight: '20px',

  p: {
    margin: 0,
    fontWeight: 500
  }
})()

export const image = css({
  display: 'block',
  margin: 'auto',
  height: 270
})()

export const text = css({
  display: 'block',
  margin: 'auto',
  textAlign: 'center',
  color: '#bfbcc6',
  lineHeight: '32px',
  fontSize: 20,
  fontWeight: 500
})()
