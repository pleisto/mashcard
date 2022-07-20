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
  typeSecondary: Palettes.deepPurple5,
  typeThirdary: Palettes.deepPurple4,
  typeDisabled: Palettes.deepPurple3,

  /**
   * Icon
   */
  iconPrimary: Palettes.deepPurple8,
  iconSecondary: Palettes.deepPurple5,
  iconThirdary: Palettes.deepPurple4,
  iconDisable: Palettes.deepPurple3,

  /**
   * Secondary
   */
  secondaryHover: Atomics.blue6_10p,
  secondaryPressed: Atomics.black_8p,
  secondarySelected: Atomics.blue6_20p,
  secondaryDrag: Atomics.blue6_14p,

  /**
   * Thirdary
   */
  thirdaryHover: Atomics.white_50p,
  thirdaryPressed: Atomics.black_12p,

  /**
   * Background
   */
  backgroundPrimary: Palettes.grey1,
  backgroundSecondary: Palettes.grey2,
  backgroundThirdary: Palettes.grey4,
  backgroundOverlayPrimary: Atomics.white_80p,
  backgroundOverlaySecondary: Atomics.black_3p,
  backgroundOverlayThirdary: Atomics.grey2_50p,
  backgroundOverlayQuaternary: Atomics.grey9_90p,

  /**
   * Border
   */
  borderPrimary: Palettes.grey2,
  borderSecondary: Palettes.grey3,
  borderThirdary: Palettes.grey7,
  borderQuaternary: Palettes.blue4,
  borderOverlayPrimary: Atomics.white_20p,
  borderOverlaySecondary: Atomics.blue6_4p,
  borderOverlayThirdary: Atomics.blue6_70p,

  /**
   * Divider
   */
  dividerPrimary: Palettes.grey2,
  dividerSecondary: Palettes.grey5,
  dividerOverlayPrimary: Atomics.black_5p,
  dividerOverlaySecondary: Atomics.black_10p,
  dividerOverlayThirdary: Atomics.blue6_60p,

  /**
   * Overlays
   */
  overlayPrimary: Atomics.black_35p,
  overlaySecondary: Atomics.grey4_40p,

  /**
   * Error
   */
  errorDefault: Palettes.red6,
  errorHover: Palettes.red7,
  errorPressed: Palettes.red8,
  errorBorder: Palettes.red2,
  errorBg: Palettes.red1,

  /**
   * Status
   */
  statusInfoBg: Palettes.blue1,
  statusSuccessBg: Palettes.green1,
  statusWarningBg: Palettes.yellow1
}
