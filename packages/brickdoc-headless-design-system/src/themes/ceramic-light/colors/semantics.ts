import { Palettes } from './palettes'
import { Atomics } from './atomics'

export const Semantics = {
  /**
   * Primary
   */
  primaryDefault: Palettes.blue6,
  primaryHover: Palettes.blue7,
  primaryPressed: Palettes.blue8,
  primaryDisable: Palettes.blue3,

  /**
   * Type
   */
  typePrimary: Palettes.deepPurple7,
  typeSecondary: Palettes.deepPurple5,
  typeThirdary: Palettes.deepPurple4,
  typeDisabled: Palettes.deepPurple3,

  /**
   * Icon
   */
  iconPrimary: Palettes.deepPurple7,
  iconSecondary: Palettes.deepPurple5,
  iconThirdary: Palettes.deepPurple4,
  iconDisable: Palettes.deepPurple3,

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
  backgroundThirdary: Palettes.grey4,
  backgroundOverlayPrimary: Atomics.white_80p,
  backgroundOverlaySecondary: Atomics.black_3p,
  backgroundOverlayThirdary: Atomics.grey2_50p,
  backgroundOverlayQuaternary: Atomics.grey2_90p,

  /**
   * Border
   */
  borderPrimary: Palettes.grey2,
  borderSecondary: Palettes.grey4,
  borderThirdary: Palettes.grey8,
  borderOverlayPrimary: Atomics.white_20p,
  borderOverlaySecondary: Atomics.blue6_4p,
  borderOverlayThirdary: Atomics.blue6_60p,

  /**
   * Divider
   */
  dividerPrimary: Palettes.grey2,
  dividerSecondary: Palettes.grey5,
  dividerOverlayPrimary: Atomics.black_5p,
  dividerOverlaySecondary: Atomics.black_10p,

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
