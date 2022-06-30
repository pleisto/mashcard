import { styled, theme } from '@mashcard/design-system'

const previewPadding = 16

const tagStyle = {
  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: 20,
  fontSize: 12,
  fontWeight: 500,
  padding: '1px 6.5px'
}

export const FormulaAutocomplete = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  background: theme.colors.backgroundOverlayThirdary,
  border: `1px solid ${theme.colors.grey3}`,
  borderRadius: 4,
  margin: '12px 0 0 0',
  height: 280,

  '.formula-autocomplete-list': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 174,
    height: '100%',
    borderRight: '1px solid #0000000d',
    overflow: 'hidden',
    overflowY: 'auto',

    // '&::-webkit-scrollbar': {
    //   appearance: 'none'
    // },

    '.autocomplete-list-item': {
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      padding: '4px 4px 4px 12px',

      '&.active, &:active, &:focus, &:hover': {
        background: theme.colors.secondaryHover
      },

      '.autocomplete-list-item-icon': {
        color: theme.colors.typeThirdary,
        fontSize: 14,
        lineHeight: '20px',
        marginTop: 4,
        marginRight: 8
      },

      '.autocomplete-list-item-content': {
        color: theme.colors.typeSecondary,
        display: 'flex',
        flexDirection: 'column'
      },

      '.autocomplete-list-item-name': {
        fontSize: 14,
        color: theme.colors.typeSecondary,
        lineHeight: '20px',
        fontWeight: '500'
      },
      '.autocomplete-list-item-desc': {
        fontSize: 12,
        lineHeight: '16px',
        color: theme.colors.typeSecondary
      }
    }
  },

  '.formula-autocomplete-preview': {
    flex: 1,
    height: '100%',
    overflow: 'hidden',
    overflowY: 'auto',

    // '&::-webkit-scrollbar': {
    //   appearance: 'none'
    // },

    '.autocomplete-preview-block': {
      marginTop: 16,
      fontSize: 12,
      padding: previewPadding,

      '.autocomplete-preview-block-name': {
        color: '#847e8e',
        lineHeight: '20px',
        fontSize: 14,
        fontWeight: 600,
        marginBottom: 4
      }
    }
  },

  '.autocomplete-preview-name': {
    fontSize: 16,
    color: theme.colors.typeSecondary,
    lineHeight: 1.5,
    fontWeight: 600
  },

  '.autocomplete-preview-tag': {
    ...tagStyle
  },

  '.autocomplete-preview-input-tag': {
    ...tagStyle,
    background: '#dde4ff',
    borderColor: '#c0cdff',
    color: theme.colors.primaryDefault
  },

  '.autocomplete-preview-output-tag': {
    ...tagStyle,
    borderColor: '#c7b7e7'
  },

  '.autocomplete-preview-section': {
    marginTop: 16,
    fontSize: 12,

    '.autocomplete-preview-section-head': {
      color: '#847e8e',
      lineHeight: '20px',
      paddingBottom: '4px',
      fontSize: 14,
      fontWeight: 600,
      marginBottom: 4
    }
  },

  '.autocomplete-preview-code-section': {
    background: '#fff',
    border: `1px solid ${theme.colors.grey3}`,
    borderRadius: 5,
    padding: '6px 12px',
    fontSize: 14,
    lineHeight: '20px'
  },

  '.formula-autocomplete-preview-variable': {
    padding: previewPadding
  },

  '.formula-autocomplete-preview-function': {
    padding: previewPadding,

    '.autocomplete-preview-arg': {
      color: '#847e8e',
      fontWeight: 400
    },

    '.autocomplete-preview-arg-separator': {
      color: '#292333'
    },

    '.autocomplete-preview-desc': {
      marginTop: 4,
      color: '#847e8e',
      lineHeight: '20px',
      fontSize: 14,
      fontWeight: 400
    },

    '.autocomplete-preview-inputs-arg': {
      marginBottom: 4
    },

    '.autocomplete-preview-example': {
      background: '#fff',
      border: `1px solid ${theme.colors.grey3}`,
      borderRadius: 5,
      padding: '6px 12px',
      fontSize: 14,
      lineHeight: '20px',

      '.autocomplete-preview-example-result': {
        color: '#847e8e'
      }
    },

    '.autocomplete-preview-example + .autocomplete-preview-example': {
      marginTop: 4
    }
  }
})
