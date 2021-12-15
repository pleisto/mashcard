import { Palettes } from './palettes'
import { rgba } from 'polished'
import { noiseDataUri } from './assets/noise.datauri'

export const Atomics = {
  white_20p: rgba(Palettes.white, 0.2),
  white_25p: rgba(Palettes.white, 0.25),
  white_70p: rgba(Palettes.white, 0.7),
  white_74p: rgba(Palettes.white, 0.74),
  white_80p: rgba(Palettes.white, 0.8),

  grey1_8p: rgba(Palettes.grey1, 0.08),
  grey1_80p: rgba(Palettes.grey1, 0.8),
  grey2_50p: rgba(Palettes.grey2, 0.5),
  grey2_90p: rgba(Palettes.grey2, 0.9),
  grey4_40p: rgba(Palettes.grey4, 0.4),
  grey6_2p: rgba(Palettes.grey6, 0.02),

  black_2p: rgba(Palettes.black, 0.02),
  black_3p: rgba(Palettes.black, 0.03),
  black_5p: rgba(Palettes.black, 0.05),
  black_10p: rgba(Palettes.black, 0.1),
  black_12p: rgba(Palettes.black, 0.12),
  black_35p: rgba(Palettes.black, 0.35),

  cyan1_36p: rgba(Palettes.cyan1, 0.36),

  blue6_12p: rgba(Palettes.blue6, 0.12),
  blue6_18p: rgba(Palettes.blue6, 0.18),

  noise: `url(${noiseDataUri})`
}
