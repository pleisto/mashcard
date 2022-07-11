require('@testing-library/jest-dom/extend-expect')
const crypto = require('crypto')
const { toHaveNoViolations } = require('jest-axe')

expect.extend(toHaveNoViolations)

Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: arr => crypto.randomBytes(arr.length)
  }
})

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
window.scroll = () => {}
