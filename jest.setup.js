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
