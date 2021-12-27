export const triggerArgTypes = {
  arrowPointAtCenter: {
    description: '`boolean` Whether the arrow should point to the center of the target',
    control: {
      type: 'boolean'
    }
  },
  autoAdjustOverflow: {
    description: '`boolean` Whether to adjust popup placement automatically when popup is off screen',
    control: {
      type: 'boolean'
    }
  },
  defaultVisible: {
    description: '`boolean` Whether the floating tooltip card is visible by default',
    control: {
      type: 'boolean'
    }
  },
  destroyTooltipOnHide: {
    description:
      '`boolean | { keepParent?: boolean }	` Whether destroy tooltip when hidden, parent container of tooltip will be destroyed when keepParent is false',
    control: {
      type: 'boolean'
    }
  },
  getPopupContainer: {
    description: '`() => HTMLElement` The DOM element that the tooltip is appended to'
  },
  mouseEnterDelay: {
    description: '`number` The delay in milliseconds before the tooltip is displayed'
  },
  mouseLeaveDelay: {
    description: '`number` The delay in milliseconds before the tooltip is hidden'
  },
  overlayClassName: {
    description: '`string` The class name of the overlay'
  },
  overlayStyle: {
    description: '`object` The style of the overlay'
  },
  overlayInnerStyle: {
    description: '`object` The style of the overlay content'
  },
  placement: {
    description: 'The position of the overlay',
    control: {
      type: 'select',
      options: [
        'top',
        'start',
        'end',
        'bottom',
        'topStart',
        'topEnd',
        'bottomStart',
        'bottomEnd',
        'startTop',
        'startBottom',
        'endTop',
        'endBottom'
      ]
    }
  },
  trigger: {
    description: 'The trigger type of the overlay.  Could be multiple by passing an array',
    control: {
      type: 'radio',
      options: ['hover', 'focus', 'click', 'contextMenu']
    }
  },
  visible: {
    description: '`boolean` Whether the overlay is visible',
    control: {
      type: 'boolean'
    }
  },
  zIndex: {
    description: '`number` The z-index of the tooltip',
    control: {
      type: 'number'
    }
  },
  onVisibleChange: {
    description: '`(visible: boolean) => void` Callback when the visibility of the overlay is changed'
  },
  children: {
    description: '`ReactNode` The content of the tooltip'
  },
  align: {
    description: `\`object\` This value will be merged into placement's config,
      please refer to the settings [dom-align](https://github.com/yiminghe/dom-align)`
  }
}
