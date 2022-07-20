import { rgba, theme } from '@mashcard/design-system'

export const defaultSelectionStyles = {
  '::selection': {
    background: rgba(theme.colors.secondarySelected.value, 0.18),
    color: 'unset'
  }
}
