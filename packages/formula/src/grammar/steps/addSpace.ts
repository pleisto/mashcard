import { CodeFragment, CodeFragmentStep } from '../../type'

/**
 * Add space to codeFragment
 */
export const addSpaceStep: CodeFragmentStep = ({ input: { codeFragments }, meta: { input } }) => {
  const finalCodeFragments: CodeFragment[] = []
  const spaceCodeFragment: CodeFragment = {
    code: 'Space',
    type: 'any',
    display: '!!!',
    errors: [],
    attrs: undefined
  }

  let restInput = input
  let error: any
  const prefixSpaceCount = restInput.length - restInput.trimStart().length
  if (prefixSpaceCount > 0) {
    const spaceValue = restInput.substring(0, prefixSpaceCount)
    finalCodeFragments.push({ ...spaceCodeFragment, display: spaceValue })
    restInput = restInput.substring(prefixSpaceCount)
  }

  codeFragments.forEach((codeFragment, index) => {
    if (error) return
    const replacements = [...(codeFragment.replacements ?? []), codeFragment.display]

    const r = replacements.find(replacement => restInput.toUpperCase().startsWith(replacement.toUpperCase()))
    if (r) {
      finalCodeFragments.push(codeFragment)
      restInput = restInput.substring(r.length)
    } else {
      finalCodeFragments.push({
        code: 'parseErrorOther3',
        type: 'any',
        display: restInput,
        errors: codeFragments.slice(index + 1).flatMap(c => c.errors),
        attrs: undefined
      })
      error = codeFragment
      return
    }

    const prefixSpaceCount = restInput.length - restInput.trimStart().length
    if (prefixSpaceCount > 0) {
      const spaceValue = restInput.substring(0, prefixSpaceCount)
      finalCodeFragments.push({ ...spaceCodeFragment, display: spaceValue })
      restInput = restInput.substring(prefixSpaceCount)
    }
  })

  return { codeFragments: finalCodeFragments }
}
