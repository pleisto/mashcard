import { Palettes } from './palettes'
import { rgba } from 'polished'

export const Tokens = {
  /**
   * Primary
   */
  primaryDefault: Palettes.blue6,
  primaryPressed: Palettes.blue9,
  primaryHover: Palettes.blue8,
  primaryDisable: Palettes.blue4,

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
  iconSecondary: Palettes.deepPurple4,
  iconThirdary: Palettes.deepPurple3,
  iconDisable: Palettes.deepPurple2,

  /**
   * Background
   */
  backgroundPrimary: Palettes.grey1,
  backgroundSecondary: Palettes.grey2,
  backgroundThirdary: Palettes.grey3,
  backgroundOverlayPrimary: rgba(Palettes.white, 0.8),
  backgroundOverlaySecondary: rgba(Palettes.grey2, 0.5),
  backgroundOverlayThirdary: rgba(Palettes.black, 0.03),
  backgroundOverlayThirdaryHover: rgba(Palettes.black, 0.05),
  backgroundOverlayThirdaryPressed: rgba(Palettes.black, 0.1),
  backgroundOverlayThirdarySelected: rgba(Palettes.blue6, 0.18),
  backgroundOverlayThirdaryDarg: rgba(Palettes.blue6, 0.12),
  backgroundOverlayQuaternaryHover: rgba(Palettes.white, 0.7),
  backgroundOverlayQuaternaryPressed: rgba(Palettes.black, 0.12),
  // Todo: add nosie to `ceramic`
  backgroundCeramic: rgba(Palettes.black, 0.1),
  backgroundFluidCeramic1: rgba(Palettes.cyan1, 0.88),
  borderPrimary: Palettes.grey3,
  borderSecondary: Palettes.grey4,
  borderThirdary: Palettes.grey8,
  borderOverlayPrimary: rgba(Palettes.white, 0.2),

  /**
   * Divider
   */
  dividerPrimary: Palettes.grey2,
  dividerSecondary: Palettes.grey4,
  dividerOverlayPrimary: rgba(Palettes.black, 0.05),
  dividerOverlaySecondary: rgba(Palettes.black, 0.1),
  overlayMask: rgba(Palettes.black, 0.35),

  /**
   * Error
   */
  errorDefault: Palettes.scarlet6,
  errorPressed: Palettes.scarlet9,
  errorHover: Palettes.scarlet8,
  errorBorder: Palettes.scarlet3,
  errorBg: Palettes.scarlet2,

  /**
   * Status
   */
  statusInfoBg: Palettes.blue2,
  statusSuccessBg: Palettes.green2,
  statusWarningBg: Palettes.yellow2,

  /**
   * hueRed
   */
  hueRedDefault: Palettes.red6,
  hueRedPressed: Palettes.red4,
  hueRedHover: Palettes.red3,
  hueRedBg: Palettes.red2,

  /**
   * hueOrange
   */
  hueOrangeDefault: Palettes.orange6,
  hueOrangePressed: Palettes.orange4,
  hueOrangeHover: Palettes.orange3,
  hueOrangeBg: Palettes.orange2,

  /**
   * hubYellow
   */
  hueYellowDefault: Palettes.yellow6,
  hueYellowPressed: Palettes.yellow4,
  hueYellowHover: Palettes.yellow3,
  hueYellowBg: Palettes.yellow2,

  /**
   * hueGreen
   */
  hueGreenDefault: Palettes.green6,
  hueGreenPressed: Palettes.green4,
  hueGreenHover: Palettes.green3,
  hueGreenBg: Palettes.green2,

  /**
   * hueBlue
   */
  hueBlueHover: Palettes.blue3,
  hueBlueBg: Palettes.blue2,

  /**
   * hueCyan
   */
  hueCyanDefault: Palettes.cyan6,
  hueCyanPressed: Palettes.cyan4,
  hueCyanHover: Palettes.cyan3,
  hueCyanBg: Palettes.cyan2,

  /**
   * huePurple
   */
  huePurpleDefault: Palettes.purple6,
  huePurplePressed: Palettes.purple4,
  huePurpleHover: Palettes.purple3,
  huePurpleBg: Palettes.purple2,

  /**
   * huePink
   */
  huePinkDefault: Palettes.pink6,
  huePinkPressed: Palettes.pink4,
  huePinkHover: Palettes.pink3,
  huePinkBg: Palettes.pink2
}
