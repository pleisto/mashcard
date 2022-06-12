import { css, theme } from '@brickdoc/design-system'

export const modal = css({
  ':global(.brd-modal-body)': {
    padding: 0
  }
})()

export const selectDropdown = css({
  top: '0 !important',
  left: '0 !important',
  right: '0 !important',
  width: '100% !important',
  height: 340,
  borderRadius: 0,
  boxShadow: 'none',

  ':global(.brd-select-item-empty)': {
    minHeight: 340,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14
  },

  ':global(.brd-select-item-option)': {
    alignItems: 'center'
  }
})()

export const header = css({
  minHeight: 340,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 14,

  '.select': {
    flex: 1,

    ':global(.brd-select-selector)': {
      backgroundColor: 'transparent',
      height: 32,
      flexWrap: 'unset',
      border: 'none',
      outline: 'none !important',
      transition: 'none'
    },

    ':global(.brd-select-selection-search)': {
      marginTop: 0,
      marginBottom: 0
    }
  },

  '.inviteButton': {
    width: 67,
    fontSize: 14
  },

  '.policyDropdown': {
    color: 'rgb(191 188 198 / 100%)',
    fontSize: 14,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    paddingRight: 10
  },

  '.input': {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    '&.filled': {
      '.select': {
        ':global(.brd-select-selector)': {
          backgroundColor: '#fff',
          border: `1px solid ${theme.colors.grey3}`,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderRight: 'none'
        }
      },

      '.policyDropdown': {
        backgroundColor: '#fff',
        border: `1px solid ${theme.colors.grey3}`,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeft: 'none'
      },

      '.inviteButton': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeft: 'none'
      }
    }
  }
})()

export const inviteList = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 340,

  '.placeholder': {
    color: 'rgb(191 188 198 / 100%)',
    fontSize: 14
  }
})()

export const footer = css({
  position: 'relative',
  padding: '7px 12px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  fontSize: 12,
  color: 'rgb(191 188 198 / 100%)',

  'span + span': {
    marginLeft: 4.5
  },

  '&::before': {
    content: '',
    position: 'absolute',
    top: 0,
    left: 12,
    right: 12,
    height: 1,
    background: '#f6f6f6'
  }
})()

export const menuItem = css({
  width: 310,
  padding: 16,

  '.head': {
    lineHeight: '20px',
    fontSize: 14
  },

  '.desc': {
    lineHeight: '16px',
    fontSize: 12,
    color: '#847e8e'
  }
})()

export const options = css({
  '.head': {
    height: 32,
    marginTop: 16,
    padding: '6px 16px',
    fontSize: 14,
    color: theme.colors.deepPurple3,
    fontWeight: 500
  }
})()
