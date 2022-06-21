import { css, CSS, theme } from '@mashcard/design-system'

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
        lineHeight: '1.75rem',
        marginRight: '.5rem',

        'input[type="checkbox"]': {
          height: '.875rem',
          width: '.875rem'
        }
      }
    },

    'li[data-checked="false"]': {
      color: theme.colors.typePrimary
    },

    'li[data-checked="true"]': {
      color: theme.colors.typeDisabled
    }
  }
})
