require('@testing-library/jest-dom/extend-expect')
const React = require('react')

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
