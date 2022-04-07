import { CodeFragment, CodeFragmentStep } from '../../types'

export const hideDotStep: CodeFragmentStep = ({ input: { codeFragments, positionFragment } }) => {
  const finalCodeFragments: CodeFragment[] = []
  let finalPositionFragment = positionFragment
  codeFragments.forEach((c, idx) => {
    if (c.code === 'Dot' && !c.hide) {
      const prevCodeFragment = codeFragments[idx - 1]
      const nextCodeFragment = codeFragments[idx + 1]
      if (prevCodeFragment && nextCodeFragment && prevCodeFragment.code === 'Block' && prevCodeFragment.hide) {
        const nextErrors = nextCodeFragment.errors
        if (nextErrors.length === 0 || (nextErrors.length === 1 && nextErrors[0].type !== 'deps')) {
          finalCodeFragments.pop()
          if (finalPositionFragment.tokenIndex >= idx - 1) {
            finalPositionFragment = { ...finalPositionFragment, tokenIndex: finalPositionFragment.tokenIndex - 3 }
          }
          return
        }
      }
    }

    finalCodeFragments.push(c)
  })

  // console.log({ codeFragments, finalCodeFragments, positionFragment, finalPositionFragment })
  return { codeFragments: finalCodeFragments, positionFragment: finalPositionFragment }
}
