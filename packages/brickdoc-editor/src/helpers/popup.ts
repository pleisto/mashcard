import tippy, { Content, GetReferenceClientRect, Instance, Placement, Props } from 'tippy.js'

export type { Instance as PopupInstance } from 'tippy.js'

export function createPopup(clientRect: GetReferenceClientRect, content: Content, placement: Placement = 'bottom-start'): Instance<Props> {
  return tippy('body', {
    getReferenceClientRect: clientRect,
    appendTo: () => document.body,
    content,
    showOnCreate: true,
    interactive: true,
    trigger: 'manual',
    placement
  })[0]
}
