// eslint-disable-next-line max-classes-per-file
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

class ClipboardItem {}

window.ClipboardItem = ClipboardItem

Object.assign(navigator, {
  clipboard: {
    writeText: () => {}
  }
})

window.scrollTo = () => {}
window.scroll = () => {}

const t = str => str
jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    const ret = {
      t,
      i18n: {
        changeLanguage: () => new Promise(() => {})
      },
      ready: true
    }
    return [ret.t, ret.i18n, ret.ready]
  }
}))
