import tippy, { Content, GetReferenceClientRect, Instance, Placement } from 'tippy.js'

export type PopupInstance = Instance

export function createPopup(clientRect: GetReferenceClientRect, content: Content, placement: Placement = 'bottom-start') {
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
