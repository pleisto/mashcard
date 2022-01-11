import { CodeFragment, FormulaCodeFragmentAttrs } from '@brickdoc/formula'
import { JSONContent } from '@tiptap/core'

export const buildJSONContentByDefinition = (definition: string | undefined): JSONContent | undefined => {
  if (!definition) {
    return undefined
  }

  return buildJSONContentByArray([{ type: 'text', text: definition }])
}

export const buildJSONContentByArray = (content: JSONContent[]): JSONContent => {
  return { type: 'doc', content: [{ type: 'paragraph', content }] }
}

export const fetchJSONContentArray = (content: JSONContent | undefined): JSONContent[] => {
  return content?.content?.[0]?.content ?? []
}

export const codeFragmentsToJSONContentTotal = (codeFragments: CodeFragment[] | undefined): JSONContent | undefined => {
  if (!codeFragments) return undefined
  if (codeFragments.length === 0) return undefined

  const content: JSONContent[] = []

  codeFragments.forEach(codeFragment => {
    content.push(...codeFragmentToJSONContentArray(codeFragment))
  })

  return buildJSONContentByArray(content)
}

export const codeFragmentToJSONContentArray = (codeFragment: CodeFragment): JSONContent[] => {
  const result: JSONContent[] = []

  const attr = attrsToJSONContent({
    hidden: codeFragment.hidden,
    display: codeFragment.display,
    value: codeFragment.name,
    code: codeFragment.code,
    type: codeFragment.type,
    error: codeFragment.errors.length === 0 ? '' : codeFragment.errors[0].message
  })
  if (codeFragment.display()) {
    result.push(attr)
  }

  return result
}

export const attrsToJSONContent = (attrs: FormulaCodeFragmentAttrs): JSONContent => {
  return { type: 'text', text: attrs.display(), marks: [{ type: 'FormulaType', attrs }] }
}

export const positionBasedContentArrayToInput = (
  content: JSONContent[],
  position: number
): { prevText: string; nextText: string } => {
  const prevTexts: string[] = []
  const nextTexts: string[] = []
  let input = ''

  content.forEach((c: JSONContent) => {
    const text = JSONContentToText(c)
    input = input.concat(c.text ?? '')
    if (input.length > position) {
      nextTexts.push(text)
    } else {
      prevTexts.push(text)
    }
  })

  // console.log({ prevTexts, nextTexts, input, position, content })
  return { prevText: prevTexts.join(''), nextText: nextTexts.join('') }
}

export const contentArrayToInput = (content: JSONContent[]): string => {
  const input = content.map((c: JSONContent) => JSONContentToText(c, true)).join('') ?? ''
  // console.log({ content, input })
  return input
}

const JSONContentToText = (c: JSONContent, textOnly: boolean = false): string => {
  if (c.type !== 'text') {
    console.error('JSONContentToText: not text', c)
    return ''
  }

  const text = c.text ?? ''

  if (textOnly) {
    return text
  }

  if (!c.marks) {
    return text
  }

  const mark = c.marks[0]

  if (!mark) {
    return text
  }

  if (mark.type !== 'FormulaType') {
    console.error('JSONContentToText: not FormulaType', c)
    return text
  }

  const attrs: FormulaCodeFragmentAttrs | undefined = mark.attrs as FormulaCodeFragmentAttrs

  if (!attrs) {
    console.error('JSONContentToText: no attrs', c)
    return text
  }

  if (attrs.display() === text) {
    return attrs.value
  }

  // if (text.startsWith(attrs.display)) {
  //   return `${attrs.value}${text.slice(attrs.display.length)}`
  // }

  // if (text.endsWith(attrs.display)) {
  //   return `${text.slice(0, -attrs.display.length)}${attrs.value}`
  // }

  return text
}
