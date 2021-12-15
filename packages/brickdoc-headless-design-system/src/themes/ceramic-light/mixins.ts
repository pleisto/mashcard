import { colors } from './colors'
import { borderStyles } from './borderStyles'
import { CeramicsMixins } from './colors/ceramics'
export const mixins = {
  ...CeramicsMixins,
  /**
   * FocusRing Outline Styles
   */
  focusOutline: {
    outline: borderStyles.focusRing,
    outlineOffset: '3px',
    borderRadius: '4px'
  },
  /**
   * Refraction
   */
  refractionPrimary: {
    boxShadow: `2px 2px 0px ${colors.white_80p}, 0px 4px 12px ${colors.grey4_40p},
    inset 2px 2px 0px ${colors.white_25p}`,
    backdropFilter: 'blur(20px)'
  },
  refractionSecondary: {
    boxShadow: `2px 2px 0px ${colors.black_3p}, 0px 4px 12px ${colors.grey6_2p},
    inset 2px 2px 0px ${colors.white_25p}`
  },
  /**
   * Shoadows
   */
  shadowSm: {
    boxShadow: `0px 2px 4px rgba(44, 91, 255, 0.02), 0px 4px 4px rgba(0, 0, 0, 0.04)`
  },
  shadowMd: {
    boxShadow: `0px 2px 4px rgba(44, 91, 255, 0.04), 0px 4px 6px rgba(0, 0, 0, 0.1)`
  },
  shadowLg: {
    boxShadow: `0px 4px 8px rgba(44, 91, 255, 0.06), 0px 8px 16px rgba(0, 0, 0, 0.12)`,
    backdropFilter: 'blur(60px)'
  },
  shadowXl: {
    boxShadow: `0px 12px 24px rgba(44, 91, 255, 0.08), 0px 20px 22px rgba(0, 0, 0, 0.12)`,
    backdropFilter: 'blur(60px)'
  },
  shadowXxl: {
    boxShadow: `0px 16px 32px rgba(44, 91, 255, 0.08), 0px 24px 48px rgba(0, 0, 0, 0.16)`,
    backdropFilter: 'blur(60px)'
  }
}
