import { theme, css } from '../../../themes'
// import { Inner } from '../..//Tooltip/styles/index.style'

const arrowOffset = {
  vertical: '12px',
  horizontal: '16px'
}

const distance = '10px'
const arrowWidth = '6px'
/**
 * @tooltip-arrow-shadow-width: 3px
 * arrowRotateWidth = sqrt(@tooltip-arrow-width * @tooltip-arrow-width * 2) +
  @tooltip-arrow-shadow-width * 2;
 */
const arrowRotateWidth = `${Math.sqrt(parseInt(arrowWidth, 10) * parseInt(arrowWidth, 10) * 2) + 3 * 2}px`

const basicStyle = {
  display: 'inline-flex',
  flexDirection: 'row',
  alignItems: 'center',
  textAlign: 'left',
  position: 'absolute',
  zIndex: theme.zIndices.tooltip,
  wordBreak: 'break-word',
  cursor: 'auto',
  userSelect: 'text',
  textDecoration: 'none',
  // transition: 'all 2.3s',
  '&:after': {
    position: 'absolute',
    background: theme.colors.white_20p,
    content: '""'
  },
  '&-hidden': {
    // opacity: 0
  },
  '&-placement-top, &-placement-topStart, &-placement-topEnd': {
    paddingBottom: distance
  },
  '&-placement-end, &-placement-endTop, &-placement-endBottom': {
    paddingLeft: distance
  },
  '&-placement-bottom, &-placement-bottomStart, &-placement-bottomEnd': {
    paddingTop: distance
  },
  '&-placement-start, &-placement-startTop, &-placement-startBottom': {
    paddingRight: distance
  },
  '&-inner': {
    include: ['ceramicPrimary', 'refractionPrimary', 'cornerFix'],
    backgroundColor: theme.colors.white,
    backgroundClip: 'padding-box',
    color: theme.colors.typePrimary,
    padding: '10px 12px',
    minHeight: '2rem',
    borderRadius: '4px',
    minWidth: '10rem',
    // The outline here should appear internally
    outline: `0.2px solid ${theme.colors.white}`,
    outlineOffset: '-0.2px'
  },
  '&-title': {
    textAlign: 'left',
    fontWeight: 500,
    padding: '.5rem 0'
  },
  /* NOTE: Popover does not have a arrow.
  '&-arrow': {
    position: 'absolute',
    display: 'block',
    width: arrowRotateWidth,
    height: arrowRotateWidth,
    overflow: 'hidden',
    pointerEvents: 'none',
    '&-content': {
      include: ['ceramicPrimary'],
      position: 'absolute',
      inset: '0',
      display: 'block',
      margin: 'auto',
      width: arrowWidth,
      height: arrowWidth,
      backgroundColor: theme.colors.white,
      content: '""',
      pointerEvents: 'auto'
    }
  },
  */
  '&-placement-top &-arrow, &-placement-topStart &-arrow, &-placement-topEnd &-arrow': {
    bottom: `calc(${distance} - ${arrowRotateWidth})`,
    '&-content': {
      transform: `translateY(calc(-1*${arrowRotateWidth}/2)) rotate(45deg)`
    }
  },
  '&-placement-top &-arrow': {
    left: '50%',
    transform: 'translateX(-50%)'
  },
  '&-placement-topStart &-arrow': {
    left: arrowOffset.horizontal
  },
  '&-placement-topEnd &-arrow': {
    right: arrowOffset.horizontal
  },
  '&-placement-end &-arrow, &-placement-endTop &-arrow, &-placement-endBottom &-arrow': {
    left: `calc(${distance} - ${arrowRotateWidth})`,
    '&-content': {
      transform: `translateX(calc(${arrowRotateWidth}/2)) rotate(45deg)`
    }
  },
  '&-placement-end &-arrow': {
    top: '50%',
    transform: 'translateY(-50%)'
  },
  '&-placement-endTop &-arrow': {
    top: arrowOffset.vertical
  },
  '&-placement-endBottom &-arrow': {
    bottom: arrowOffset.vertical
  },
  '&-placement-start &-arrow, &-placement-startTop &-arrow, &-placement-startBottom &-arrow': {
    right: `calc(${distance} - ${arrowRotateWidth})`,
    '&-content': {
      transform: `translateX(calc(-1 * ${arrowRotateWidth} /2)) rotate(45deg)`
    }
  },
  '&-placement-start &-arrow': {
    top: '50%',
    transform: 'translateY(-50%)'
  },
  '&-placement-startTop &-arrow': {
    top: arrowOffset.vertical
  },
  '&-placement-startBottom &-arrow': {
    bottom: arrowOffset.vertical
  },
  '&-placement-bottom &-arrow, &-placement-bottomStart &-arrow, &-placement-bottomEnd &-arrow': {
    top: `calc(${distance} - ${arrowRotateWidth})`,
    '&-content': {
      transform: `translateY(calc(${arrowRotateWidth} /2)) rotate(45deg)`
    }
  },

  '&-placement-bottom &-arrow': {
    left: '50%',
    transform: 'translate(-50%)'
  },
  '&-placement-bottomStart &-arrow': {
    left: arrowOffset.horizontal
  },
  '&-placement-bottomEnd &-arrow': {
    right: arrowOffset.horizontal
  }
}

export const popoverStyle = css({
  ...basicStyle,
  variants: {
    compact: {
      true: {
        '&-inner': {
          padding: 0
        }
      },
      false: {}
    }
  }
})

// variants is not work correctly with prefixCls
export const popoverCompactStyle = css({
  ...basicStyle,
  '&-inner': {
    ...basicStyle['&-inner'],
    padding: 0
  }
})
