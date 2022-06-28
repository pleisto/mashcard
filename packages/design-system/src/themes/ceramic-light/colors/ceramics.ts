import { Palettes } from './palettes'
import { Atomics } from './atomics'

export const Ceramics = {
  ceramicPrimary: `linear-gradient(0deg, ${Atomics.cyan1_36p}, ${Atomics.cyan1_36p}),
     ${Atomics.white_74p}`,
  ceramicSecondary: `linear-gradient(0deg, ${Atomics.cyan1_36p}, ${Atomics.cyan1_36p}),
     ${Atomics.grey2_90p}`,

  ceramicQuaternary: `linear-gradient(0deg, ${Atomics.cyan1_36p}, ${Atomics.cyan1_36p}),
      ${Atomics.grey1_90p}`
}

const triangleCompensationSvg =
  window.btoa(`<svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.01928 2.47619L1.33984 2L3.35 4L3.01928 2.47619Z" fill="#fff"/>
</svg>`)

export const CeramicsMixins = {
  ceramicPrimary: {
    background: Ceramics.ceramicPrimary,
    boxShadow: `
    2px 2px 0px ${Atomics.white_80p},
    inset 2px 2px 0px ${Atomics.white_30p},
    inset 0px 0px 0px 0.2px ${Palettes.white}`,
    filter: `drop-shadow(0px 4px 12px ${Atomics.grey4_40p})`,
    backdropFilter: 'blur(20px)',
    '&::after': {
      content: '',
      width: 5,
      height: 5,
      background: `url(data:image/svg+xml;base64,${triangleCompensationSvg})`,
      position: 'absolute',
      left: 0,
      bottom: -2
    },
    '&::before': {
      content: '',
      width: 5,
      height: 5,
      background: `url(data:image/svg+xml;base64,${triangleCompensationSvg})`,
      position: 'absolute',
      right: -2,
      top: 0,
      transform: 'rotate(180deg)'
    }
  },
  ceramicSecondary: {
    background: Ceramics.ceramicSecondary,
    boxShadow: `
    2px 2px 0px ${Atomics.black_3p},
    inset 2px 2px 0px ${Atomics.white_25p},
    inset 0px 0px 0px 0.2px red`,
    filter: `drop-shadow(0px 4px 12px ${Atomics.grey6_2p})`
  }
}
