import { rgba } from 'polished'

export const Palette = (color: any) => ({
  ...color,

  'color-primary-default': '$blue-6',
  'color-primary-hover': '$blue-8',
  'color-primary-pressed': '$blue-9',
  'color-primary-disable': '$blue-4',

  'color-type-primary': '$deep-purple-9',
  'color-type-secondary': '$deep-purple-4',
  'color-type-thirdary': '$deep-purple-3',
  'color-type-disable': '$deep-purple-2',

  'color-icon-primary': '$deep-purple-9',
  'color-icon-secondary': '$deep-purple-4',
  'color-icon-thirdary': '$deep-purple-3',
  'color-icon-disable': '$deep-purple-2',

  'color-background-white': '$white',
  'color-background-primary': '$grey-1',
  'color-background-secondary': '$grey-2',
  'color-background-thirdary': '$grey-3',
  'color-background-acrylic': rgba(color.white, 0.6),

  'color-broder-primary': '$grey-3',
  'color-broder-secondary': '$grey-5',
  'color-broder-thirdary': rgba(color.black, 0.1),
  'color-broder-overlay-primary': rgba(color.white, 0.2),

  'color-divider-primary': '$grey-2',
  'color-divider-secondary': '$grey-4',
  'color-divider-thirdary': rgba(color.black, 0.1),

  'color-overlays-primary-hover': rgba(color.black, 0.05),
  'color-overlays-primary-pressed': rgba(color.black, 0.1),
  'color-overlays-secondary-hover': rgba(color.white, 0.1),
  'color-overlays-secondary-pressed': rgba(color.black, 0.12),
  'color-overlays-thirdary-hover': rgba(color['blue-6'], 0.18),
  'color-overlays-thirdary-drag': rgba(color['blue-6'], 0.12),

  'color-error-default': '$scarlet-6',
  'color-error-pressed': '$scarlet-9',
  'color-error-hover': '$scarlet-8',
  'color-error-border': '$scarlet-3',
  'color-error-bg': '$scarlet-2',

  'color-bg-primary': '$grey-1',
  'color-bg-secondary': '$grey-2',
  'color-bg-thirdary': '$grey-3',
  'color-bg-overlay-primary': rgba(color['grey-2'], 0.5),
  'color-bg-overlay-secondary': rgba(color['grey-2'], 0.6),
  'color-bg-overlay-thirdary-hover': rgba(color.black, 0.05),
  'color-bg-overlay-thirdary-pressed': rgba(color.black, 0.1),
  'color-bg-overlay-quaternary-hover': rgba(color.white, 0.9),
  'color-bg-overlay-quaternary-pressed': rgba(color.black, 0.12),
  'color-bg-overlay-quinary-hover': rgba(color['blue-6'], 0.18),
  'color-bg-overlay-quinary-drag': rgba(color['blue-6'], 0.12),

  'color-status-info-bg': '$blue-2',
  'color-status-success-bg': '$green-3',
  'color-status-warning-bg': '$yellow-3',

  'color-hue-red-default': '$red-6',
  'color-hue-red-pressed': '$red-4',
  'color-hue-red-hover': '$red-3',
  'color-hue-red-bg': '$red-2',

  'color-hue-orange-default': '$orange-6',
  'color-hue-orange-pressed': '$orange-4',
  'color-hue-orange-hover': '$orange-3',
  'color-hue-orange-bg': '$orange-2',

  'color-hue-yellow-dafault': '$yellow-6',
  'color-hue-yellow-pressed': '$yellow-4',
  'color-hue-yellow-hover': '$yellow-3',
  'color-hue-yellow-bg': '$yellow-2',

  'color-hue-green-dafault': '$green-6',
  'color-hue-green-pressed': '$green-4',
  'color-hue-green-hover': '$green-3',
  'color-hue-green-bg': '$green-2',

  'color-hue-blue-dafault': '$blue-6',
  'color-hue-blue-bg': '$blue-2',
  'color-hue-blue-hover': '$blue-3',

  'color-hue-cyan-dafault': '$cyan-6',
  'color-hue-cyan-pressed': '$cyan-4',
  'color-hue-cyan-hover': '$cyan-3',
  'color-hue-cyan-bg': '$cyan-2',

  'color-hue-purple-dafault': '$purple-6',
  'color-hue-purple-pressed': '$purple-4',
  'color-hue-purple-hover': '$purple-3',
  'color-hue-purple-bg': '$purple-2',

  'color-hue-pink-default': '$pink-6',
  'color-hue-pink-pressed': '$pink-4',
  'color-hue-pink-bg': '$pink-2'
})
