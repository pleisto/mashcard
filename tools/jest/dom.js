require('@testing-library/jest-dom/extend-expect')
const { toHaveNoViolations } = require('jest-axe')
const React = require('react')

expect.extend(toHaveNoViolations)

globalThis.React = React

window.matchMedia =
  window.matchMedia ||
  function matchMedia() {
    return {
      matches: false,
      addListener: function addListener() {},
      removeListener: function removeListener() {}
    }
  }

HTMLCanvasElement.prototype.getContext = () => {
  // return whatever getContext has to return
}

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver

Object.assign(navigator, {
  clipboard: {
    writeText: () => {}
  }
})

window.scrollTo = () => {}