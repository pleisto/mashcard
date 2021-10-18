import '@testing-library/jest-dom/extend-expect'
import React from 'react'

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
