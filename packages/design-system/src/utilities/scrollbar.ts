export const getNativeScrollbarWidth = (): number => {
  const wrapper = window.document.createElement('div')
  wrapper.style.visibility = 'hidden'
  wrapper.style.width = '100px'
  window.document.body.appendChild(wrapper)
  const offset = wrapper.offsetWidth
  wrapper.style.overflow = 'scroll'
  const inner = window.document.createElement('div')
  inner.style.width = '100%'
  wrapper.appendChild(inner)
  const innerOffset = inner.offsetWidth
  const width = offset - innerOffset
  wrapper?.parentNode?.removeChild(wrapper)
  return width
}
