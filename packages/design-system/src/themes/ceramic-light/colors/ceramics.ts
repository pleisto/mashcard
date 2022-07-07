import { Palettes } from './palettes'
import { Atomics } from './atomics'
import triangleCompensationSvg from './triangle-compensation.svg'

export const Ceramics = {
  ceramicPrimary: `linear-gradient(0deg, ${Atomics.cyan1_36p}, ${Atomics.cyan1_36p}),
     ${Atomics.white_74p}`,
  ceramicSecondary: `linear-gradient(0deg, ${Atomics.cyan1_36p}, ${Atomics.cyan1_36p}),
     ${Atomics.grey2_90p}`,
  ceramicQuaternary: `linear-gradient(0deg, ${Atomics.cyan1_36p}, ${Atomics.cyan1_36p}),
      ${Atomics.grey1_90p}`
}

const cornerFix = {
  '&::after': {
    content: '',
    width: 5,
    height: 5,
    background: `url(${triangleCompensationSvg})`,
    position: 'absolute',
    left: 0,
    bottom: -2
  },
  '&::before': {
    content: '',
    width: 5,
    height: 5,
    background: `url(${triangleCompensationSvg})`,
    position: 'absolute',
    right: -2,
    top: 0,
    transform: 'rotate(180deg)'
  }
}

export const CeramicsMixins = {
  ceramicPrimary: {
    background: Ceramics.ceramicPrimary,
    boxShadow: `
    2px 2px 0px ${Atomics.white_80p},
    inset 2px 2px 0px ${Atomics.white_30p},
    inset 0px 0px 0px 0.2px ${Palettes.white}`,
    filter: `drop-shadow(0px 4px 12px ${Atomics.grey4_40p})`,
    backdropFilter: 'blur(20px)',
    ...cornerFix
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
