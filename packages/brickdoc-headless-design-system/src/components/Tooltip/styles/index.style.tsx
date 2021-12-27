import { theme, css } from '../../../themes'

const arrowOffset = {
  vertical: '5px',
  horizontal: '13px'
}

const distance = '8px'
const arrowWidth = '5px'
/**
 * @tooltip-arrow-shadow-width: 3px
 * arrowRotateWidth = sqrt(@tooltip-arrow-width * @tooltip-arrow-width * 2) +
  @tooltip-arrow-shadow-width * 2;
 */
const arrowRotateWidth = `${Math.sqrt(parseInt(arrowWidth, 10) * parseInt(arrowWidth, 10) * 2) + 3 * 2}px`

export const tooltipStyle = css({
  position: 'absolute',
  display: 'inline-flex',
  flexDirection: 'row',
  alignItems: 'center',
  wordBreak: 'break-word',
  width: 'max-content',
  maxWidth: '250px',
  listStyle: 'none',
  zIndex: theme.zIndices.tooltip,
  '&-hidden': {
    display: 'none'
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
    minHeight: '2rem',
    minWidth: '3rem',
    borderRadius: '2px',
    padding: '6px 8px',
    backgroundColor: theme.colors.grey9,
    color: theme.colors.white,
    textDecoration: 'none',
    textAlign: 'left'
  },
  '&-arrow': {
    position: 'absolute',
    display: 'block',
    width: arrowRotateWidth,
    height: arrowRotateWidth,
    overflow: 'hidden',
    pointerEvents: 'none',
    '&-content': {
      position: 'absolute',
      inset: '0',
      display: 'block',
      margin: 'auto',
      width: arrowWidth,
      height: arrowWidth,
      backgroundColor: theme.colors.grey9,
      content: '""',
      pointerEvents: 'auto'
    }
  },
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
})
