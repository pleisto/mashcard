import { CodeFragment, CodeFragmentStep } from '../../types'
import { codeFragment2value } from '../convert'

export const addSpaceStep: CodeFragmentStep = ({
  input: { codeFragments, positionFragment },
  meta: { input, namespaceId }
}) => {
  const finalCodeFragments: CodeFragment[] = []
  const spaceCodeFragment: CodeFragment = {
    code: 'Space',
    hide: false,
    type: 'any',
    display: ' ',
    errors: [],
    attrs: undefined
  }

  let restInput = input
  let error = false
  let image = ''
  codeFragments.forEach((codeFragment, idx) => {
    let match = false
    if (error) return
    image = codeFragment2value(codeFragment, namespaceId)

    if (restInput.startsWith(image)) {
      finalCodeFragments.push(codeFragment)
      restInput = restInput.substring(image.length)
      match = true
    }

    const prefixSpaceCount = restInput.length - restInput.trimStart().length
    if (prefixSpaceCount > 0) {
      const spaceValue = ' '.repeat(prefixSpaceCount)
      finalCodeFragments.push({ ...spaceCodeFragment, display: spaceValue })
      restInput = restInput.substring(prefixSpaceCount)
    }

    if (!match) {
      error = true
    }
  })

  if (error) {
    return { codeFragments, positionFragment }
  }

  return { codeFragments: finalCodeFragments, positionFragment }
}
