import tippy, { GetReferenceClientRect, Instance, Placement, Props } from 'tippy.js'
import maxSize from 'popper-max-size-modifier'

export type { Instance as PopupInstance } from 'tippy.js'

const POPUP_MIN_HEIGHT = 318

export function createPopup(
  clientRect: GetReferenceClientRect,
  content: HTMLElement,
  placement: Placement = 'bottom-start'
): Instance<Props> {
  // @popperjs Modifier
  const applyMaxSize: any = {
    name: 'applyMaxSize',
    enabled: true,
    phase: 'beforeWrite',
    requires: ['maxSize'],
    fn({ state }: any) {
      // The `maxSize` modifier provides this data
      const { width, height } = state.modifiersData.maxSize
      const margin = 10

      content.style.maxWidth = `${width - margin}px`
      content.style.maxHeight = `${Math.max(height, POPUP_MIN_HEIGHT) - margin}px`

      state.styles.popper = {
        ...state.styles.popper,
        maxWidth: `${width}px`,
        maxHeight: `${height}px`
      }
    }
  }

  return tippy('body', {
    getReferenceClientRect: clientRect,
    appendTo: () => document.body,
    content,
    showOnCreate: true,
    interactive: true,
    trigger: 'manual',
    placement,
    popperOptions: {
      // auto detect overflow of viewport
      modifiers: [maxSize, applyMaxSize]
    }
  })[0]
}
