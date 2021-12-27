import { Palettes } from './palettes'
import { Atomics } from './atomics'

export const Ceramics = {
  ceramicPrimary: `linear-gradient(0deg, ${Atomics.cyan1_40p}, ${Atomics.cyan1_40p}),
     ${Atomics.white_64p}`,
  ceramicSecondary: `linear-gradient(0deg, ${Atomics.cyan1_40p}, ${Atomics.cyan1_40p}),
     ${Atomics.grey2_90p}`,

  ceramicQuaternary: `linear-gradient(0deg, ${Atomics.cyan1_40p}, ${Atomics.cyan1_40p}),
      ${Atomics.grey1_80p}`
}

export const CeramicsMixins = {
  ceramicPrimary: {
    background: Ceramics.ceramicPrimary,
    boxShadow: `
    2px 2px 0px ${Atomics.white_80p},
    inset 2px 2px 0px ${Atomics.white_30p},
    inset 0px 0px 0px 0.2px ${Palettes.white}`,
    filter: `drop-shadow(0px 4px 12px ${Atomics.grey4_40p})`,
    backdropFilter: 'blur(20px)'
  },
  ceramicSecondary: {
    background: Ceramics.ceramicSecondary,
    boxShadow: `
    2px 2px 0px ${Atomics.black_3p},
    inset 2px 2px 0px ${Atomics.white_25p},
    inset 0px 0px 0px 0.2px ${Palettes.white}`,
    filter: `drop-shadow(0px 4px 12px ${Atomics.grey6_2p})`
  }
}
