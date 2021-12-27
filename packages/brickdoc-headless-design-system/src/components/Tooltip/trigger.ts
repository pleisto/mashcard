import { TooltipProps as RcTooltipProps } from 'rc-tooltip/lib/Tooltip'
import { BuildInPlacements } from 'rc-trigger'

export type TriggerPlacement =
  | 'top'
  | 'start'
  | 'bottom'
  | 'end'
  | 'topStart'
  | 'topEnd'
  | 'bottomStart'
  | 'bottomEnd'
  | 'startTop'
  | 'startBottom'
  | 'endTop'
  | 'endBottom'

export interface AdjustOverflow {
  adjustX?: 0 | 1
  adjustY?: 0 | 1
}

export interface PlacementsConfig {
  arrowWidth?: number
  horizontalArrowShift?: number
  verticalArrowShift?: number
  arrowPointAtCenter?: boolean
  autoAdjustOverflow?: boolean | AdjustOverflow
}

export interface AbstractTriggerProps extends Partial<Omit<RcTooltipProps, 'children' | 'color'>> {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  openClassName?: string
  arrowPointAtCenter?: boolean
  autoAdjustOverflow?: boolean | AdjustOverflow
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
  builtinPlacements?: BuildInPlacements
  role?: 'tooltip' | 'dialog' | 'menu'
}

const autoAdjustOverflowEnabled: AdjustOverflow = {
  adjustX: 1,
  adjustY: 1
}

const autoAdjustOverflowDisabled: AdjustOverflow = {
  adjustX: 0,
  adjustY: 0
}

const targetOffset = [0, 0]

export function getOverflowOptions(autoAdjustOverflow?: boolean | AdjustOverflow): AdjustOverflow {
  if (typeof autoAdjustOverflow === 'boolean') {
    return autoAdjustOverflow ? autoAdjustOverflowEnabled : autoAdjustOverflowDisabled
  }
  return {
    ...autoAdjustOverflowDisabled,
    ...autoAdjustOverflow
  }
}

/**
 * Override `placements` from `rc-tooltip/src/placements.tsx`.
 *
 * Use `start` and `end` instead of `top` and `bottom` to ensure
 * more consistent semantics with Internationalization.
 */
export const defaultPlacements: BuildInPlacements = {
  start: {
    points: ['cr', 'cl'],
    overflow: autoAdjustOverflowEnabled,
    offset: [-4, 0],
    targetOffset
  },
  end: {
    points: ['cl', 'cr'],
    overflow: autoAdjustOverflowEnabled,
    offset: [4, 0],
    targetOffset
  },
  top: {
    points: ['bc', 'tc'],
    overflow: autoAdjustOverflowDisabled,
    offset: [0, -4],
    targetOffset
  },
  bottom: {
    points: ['tc', 'bc'],
    overflow: autoAdjustOverflowDisabled,
    offset: [0, 4],
    targetOffset
  },
  topStart: {
    points: ['bl', 'tl'],
    overflow: autoAdjustOverflowEnabled,
    offset: [0, -4],
    targetOffset
  },
  startTop: {
    points: ['tr', 'tl'],
    overflow: autoAdjustOverflowEnabled,
    offset: [-4, 0],
    targetOffset
  },
  topEnd: {
    points: ['br', 'tr'],
    overflow: autoAdjustOverflowEnabled,
    offset: [0, -4],
    targetOffset
  },
  endTop: {
    points: ['tl', 'tr'],
    overflow: autoAdjustOverflowEnabled,
    offset: [4, 0],
    targetOffset
  },
  bottomEnd: {
    points: ['tr', 'br'],
    overflow: autoAdjustOverflowEnabled,
    offset: [0, 4],
    targetOffset
  },
  endBottom: {
    points: ['bl', 'br'],
    overflow: autoAdjustOverflowEnabled,
    offset: [4, 0],
    targetOffset
  },
  bottomStart: {
    points: ['tl', 'bl'],
    overflow: autoAdjustOverflowEnabled,
    offset: [0, 4],
    targetOffset
  },
  startBottom: {
    points: ['br', 'bl'],
    overflow: autoAdjustOverflowEnabled,
    offset: [-4, 0],
    targetOffset
  }
}

export function getPlacements(config: PlacementsConfig): BuildInPlacements {
  const { arrowWidth = 4, horizontalArrowShift = 16, verticalArrowShift = 8, autoAdjustOverflow } = config
  const placementMap: BuildInPlacements = {
    start: {
      points: ['cr', 'cl'],
      offset: [-4, 0]
    },
    end: {
      points: ['cl', 'cr'],
      offset: [4, 0]
    },
    top: {
      points: ['bc', 'tc'],
      offset: [0, -4]
    },
    bottom: {
      points: ['tc', 'bc'],
      offset: [0, 4]
    },
    topStart: {
      points: ['bl', 'tc'],
      offset: [-(horizontalArrowShift + arrowWidth), -4]
    },
    startTop: {
      points: ['tr', 'cl'],
      offset: [-4, -(verticalArrowShift + arrowWidth)]
    },
    topEnd: {
      points: ['br', 'tc'],
      offset: [horizontalArrowShift + arrowWidth, -4]
    },
    endTop: {
      points: ['tl', 'cr'],
      offset: [4, -(verticalArrowShift + arrowWidth)]
    },
    bottomEnd: {
      points: ['tr', 'bc'],
      offset: [horizontalArrowShift + arrowWidth, 4]
    },
    endBottom: {
      points: ['bl', 'cr'],
      offset: [4, verticalArrowShift + arrowWidth]
    },
    bottomStart: {
      points: ['tl', 'bc'],
      offset: [-(horizontalArrowShift + arrowWidth), 4]
    },
    startBottom: {
      points: ['br', 'cl'],
      offset: [-4, verticalArrowShift + arrowWidth]
    }
  }
  Object.keys(placementMap).forEach(key => {
    placementMap[key] = config.arrowPointAtCenter
      ? {
          ...placementMap[key],
          overflow: getOverflowOptions(autoAdjustOverflow),
          targetOffset
        }
      : {
          ...defaultPlacements[key],
          overflow: getOverflowOptions(autoAdjustOverflow)
        }

    placementMap[key].ignoreShake = true
  })
  return placementMap
}
