import { styled } from '../../../themes'
import { rgba, rem } from 'polished'

export const PageBlock = styled('div', {})

export const Indent = styled('div', {
  display: 'block',
  // width: '$lg',
  variants: {
    size: {
      1: {
        width: rem(`${16 * 1}px`)
      },
      2: {
        width: rem(`${16 * 2}px`)
      },
      3: {
        width: rem(`${16 * 3}px`)
      },
      4: {
        width: rem(`${16 * 4}px`)
      },
      5: {
        width: rem(`${16 * 5}px`)
      },
      6: {
        width: rem(`${16 * 6}px`)
      }
    }
  }
})

export const PageItem = styled('a', {
  display: 'block',
  color: 'inherit',
  textDecoration: 'none',
  width: '100%'
})

export const ItemContent = styled('div', {
  userSelect: 'none',
  transition: 'background 20ms ease-in 0s',
  cursor: 'pointer',
  width: '100%'
})

export const Content = styled('div', {
  display: 'flex',
  alignItems: 'center',
  lineHeight: '$3xl',
  fontSize: '$subheadline',
  width: '100%'
})

export const ContentArrow = styled('div', {
  flexShrink: 0,
  flexGrow: 0,
  position: 'relative',
  width: '$lg',
  height: '$3xl',
  borderRadius: '3px',
  color: '$color-type-secondary',
  fontSize: '$body',
  paddingRight: '$2xs',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 0,
  '& span': {
    transform: 'rotate(0deg)',
    transition: 'transform .1s ease-in-out'
  },
  variants: {
    isOpen: {
      true: {
        '& span': {
          transform: 'rotate(90deg)'
        }
      }
    }
  }
})

export const LeafDot = styled('div', {
  position: 'absolute',
  width: '$2xs',
  height: '$2xs',
  background: '$color-icon-secondary',
  borderRadius: '$2xs',
  top: rem('14px')
})

export const ContentIcon = styled('a', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  flexGrow: 0,
  width: '$xl',
  height: '$xl',
  fontSize: '$title4',
  marginRight: '4px',
  position: 'relative'
})

export const ContentTitle = styled('div', {
  flex: '1 1 auto',
  whiteSpace: 'nowrap',
  minWidth: '0px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: 'flex',
  alignItems: 'center',
  fontWeight: 600,
  fontSize: '$subheadline',
  color: '$color-type-primary',
  '&:hover': {
    color: '$color-type-primary'
  }
})

export const ContentAction = styled('div', {
  marginBottom: '$3xs',
  width: '100%',
  fontSize: '$body',
  fontWeight: '500',
  lineHeight: '$2xl'
})

export const Base = styled('div', {
  boxSizing: 'border-box',
  display: 'flex',
  height: '$3xl',
  paddingLeft: '$md',
  borderRadius: '$2xs',
  background: 'transparent',
  marginRight: '$3xs',
  marginBottom: '$3xs',

  '&:hover': {
    background: '$color-bg-overlay-thirdary-hover',
    boxShadow: '$tree-default',
    backdropFilter: 'blur(40px)'
  },
  '&:focus-visible': {
    outline: 'none'
  },

  variants: {
    size: {},
    pressed: {
      true: {
        '&:hover': {
          background: '$color-overlays-primary-pressed'
        }
      }
    },
    selected: {
      true: {
        background: '$color-bg-overlay-quinary-drag',
        borderColor: rgba(44, 91, 255, 0.04),
        boxShadow: '$tree-selected',
        '&:hover': {
          background: '$color-bg-overlay-quinary-drag',
          borderColor: rgba(44, 91, 255, 0.04),
          boxShadow: '$tree-selected'
        }
      }
    },
    variant: {},
    full: {}
  },
  compoundVariants: [],
  defaultVariants: {}
})
