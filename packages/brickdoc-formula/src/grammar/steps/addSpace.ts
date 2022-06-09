import { CodeFragment, CodeFragmentStep } from '../../types'

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
  let error = false
  codeFragments.forEach(codeFragment => {
    if (error) return
    const replacements = [...(codeFragment.replacements ?? []), codeFragment.display]

    const r = replacements.find(replacement => restInput.toUpperCase().startsWith(replacement.toUpperCase()))
    if (r) {
      finalCodeFragments.push(codeFragment)
      restInput = restInput.substr(r.length)
    } else {
      error = true
    }

    const prefixSpaceCount = restInput.length - restInput.trimStart().length
    if (prefixSpaceCount > 0) {
      const spaceValue = restInput.substring(0, prefixSpaceCount)
      finalCodeFragments.push({ ...spaceCodeFragment, display: spaceValue })
      restInput = restInput.substring(prefixSpaceCount)
    }
  })

  if (error) {
    console.debug('addSpaceStep error', input, codeFragments, restInput, finalCodeFragments)
    return { codeFragments }
  }

  return { codeFragments: finalCodeFragments }
}
