import { css, CSS, theme } from '@mashcard/design-system'
import checkedIcon from '@mashcard/design-icons/assets/basic/check.svg'

export const listLevelStyles = {
  'ul[data-node-view-content=""]': {
    listStyleType: 'disc',

    ul: {
      listStyleType: 'circle',

      ul: {
        listStyleType: 'square'
      }
    }
  }
}

export const listItemStyles: CSS = {
  'li::marker': {
    fontSize: '1rem',
    fontWeight: 400,
    letterSpacing: 0,
    lineHeight: '1.5rem',
    textAlign: 'center'
  },

  'li + li': {
    marginTop: '.5rem'
  },

  'li > ol, li > ul': {
    marginBottom: 0,
    marginTop: '.5rem',

    li: {
      marginTop: '4px'
    }
  }
}

export const bulletListStyles = css({
  'ul[data-node-view-content=""]': {
    margin: 0,
    padding: '0 0 0 1.5rem',
    ...listLevelStyles['ul[data-node-view-content=""]'],

    li: {
      fontSize: '1rem',
      lineHeight: '1.75rem'
    },

    ...listItemStyles
  },

  'ul ul ul': {
    ...listLevelStyles,

    'ul ul ul': {
      ...listLevelStyles,

      'ul ul ul': {
        ...listLevelStyles
      }
    }
  }
})

export const orderedListStyles = css({
  'ol[data-node-view-content=""]': {
    counterReset: 'item',
    listStyleType: 'none',
    padding: 0,

    li: {
      counterIncrement: 'item',
      display: 'table',
      fontSize: '1rem',
      lineHeight: '1.75rem',
      width: '100%'
    },

    'li::before': {
      content: `counters(item, '.') '.'`,
      display: 'table-cell',
      fontWeight: 'bold',
      paddingRight: '4px',
      width: '10px'
    },

    ...listItemStyles
  }
})

export const taskListStyles = css({
  'ul[data-node-view-content=""]': {
    listStyleType: 'none',
    paddingLeft: 0,

    li: {
      alignItems: 'flex-start',
      display: 'flex',
      flexDirection: 'row',

      label: {
        position: 'relative',
        marginRight: '.5rem',
        marginTop: '0.125rem',
        height: '1.125rem',
        width: '1.125rem',
        borderRadius: '100%',
        outline: '2px solid',
        outlineOffset: -2,
        outlineColor: theme.colors.overlaySecondary,
        cursor: 'pointer',

        'input[type="checkbox"]': {
          opacity: 0,
          cursor: 'pointer',
        }
      },

      p: {
        lineHeight: '1.5rem'
      }
    },

    'li + li': {
      marginTop: 6
    },

    'li[data-checked="false"]': {
      color: theme.colors.typePrimary
    },

    'li[data-checked="true"]': {
      color: theme.colors.typeDisabled,

      label: {
        outline: 'unset',
        background: `${theme.colors.primaryDefault} url(${checkedIcon}) no-repeat center/16px 16px`
      }
    }
  }
})
 