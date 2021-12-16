import { Palettes } from './palettes'
import { Atomics } from './atomics'

export const Semantics = {
  /**
   * Primary
   */
  primaryDefault: Palettes.blue7,
  primaryHover: Palettes.blue8,
  primaryPressed: Palettes.blue9,
  primaryDisable: Palettes.blue3,

  /**
   * Type
   */
  typePrimary: Palettes.deepPurple9,
  typeSecondary: Palettes.deepPurple4,
  typeThirdary: Palettes.deepPurple3,
  typeDisabled: Palettes.deepPurple2,

  /**
   * Icon
   */
  iconPrimary: Palettes.deepPurple9,
  iconSecondary: Palettes.deepPurple7,
  iconThirdary: Palettes.deepPurple3,
  iconDisable: Palettes.deepPurple2,

  /**
   * Secondary
   */
  secondaryHover: Atomics.black_5p,
  secondaryPressed: Atomics.black_10p,
  secondarySelected: Atomics.blue6_18p,
  secondaryDrag: Atomics.blue6_12p,

  /**
   * Thirdary
   */
  thirdaryHover: Atomics.white_70p,
  thirdaryPressed: Atomics.black_12p,

  /**
   * Background
   */
  backgroundPrimary: Palettes.grey1,
  backgroundSecondary: Palettes.grey2,
  backgroundThirdary: Palettes.grey6,
  backgroundOverlayPrimary: Atomics.black_3p,
  backgroundOverlaySecondary: Atomics.grey2_50p,

  /**
   * Border
   */
  borderPrimary: Palettes.grey3,
  borderSecondary: Palettes.grey4,
  borderThirdary: Palettes.grey8,
  borderOverlayPrimary: Atomics.white_20p,

  /**
   * Divider
   */
  dividerPrimary: Palettes.grey3,
  dividerSecondary: Palettes.grey4,
  dividerThirdary: Palettes.grey8,
  dividerOverlayPrimary: Atomics.black_5p,

  /**
   * Overlays
   */
  overlayMask: Atomics.black_35p,

  /**
   * Focus
   */
  focusDefault: Palettes.blue7,

  /**
   * Error
   */
  errorDefault: Palettes.red7,
  errorHover: Palettes.red8,
  errorPressed: Palettes.red9,
  errorBorder: Palettes.red3,
  errorBg: Palettes.red1,

  /**
   * Status
   */
  statusInfoBg: Palettes.blue1,
  statusSuccessBg: Palettes.green1,
  statusWarningBg: Palettes.yellow1
}
