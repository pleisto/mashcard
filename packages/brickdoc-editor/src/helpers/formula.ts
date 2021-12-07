import { CodeFragment } from '@brickdoc/formula'
import { JSONContent } from '@tiptap/core'

export const codeFragmentsToJSONContent = (codeFragments: CodeFragment[] | undefined): JSONContent | undefined => {
  if (!codeFragments) return undefined
  if (codeFragments.length === 0) return undefined

  const content: JSONContent[] = []

  codeFragments.forEach(codeFragment => {
    content.push({
      // text: codeFragment.name,
      type: 'codeFragmentBlock',
      // type: codeFragment.code,
      attrs: codeFragment,
      content: [{ text: codeFragment.name, type: 'text' }]
    })
  })

  const jsonContent = { type: 'doc', content }
  return jsonContent
}
