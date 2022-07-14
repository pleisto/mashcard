import { CodeFragmentWithIndex } from '@mashcard/formula'
import { JSONContent } from '@tiptap/core'
import { FormulaInput } from '../components/blockViews'

const maybeRemoveDefinitionEqual = (definition: string | undefined, formulaIsNormal: boolean): string => {
  if (!definition) return ''
  if (!formulaIsNormal) return definition

  if (definition.startsWith('=')) {
    return definition.substring(1)
  }

  return definition
}

const maybeRemoveCodeFragmentsEqual = (
  codeFragments: CodeFragmentWithIndex[],
  formulaIsNormal: boolean
): CodeFragmentWithIndex[] => {
  if (!codeFragments.length) return []
  if (!formulaIsNormal) return codeFragments

  const firstCodeFragment = codeFragments[0]

  if (firstCodeFragment.code === 'Equal') {
    return codeFragments.slice(1)
  }

  return codeFragments
}

export const buildJSONContentByArray = (content: JSONContent[]): JSONContent => {
  return { type: 'doc', content: [{ type: 'paragraph', content }] }
}

export const content2contents = (content: JSONContent): JSONContent[] => {
  if (!content) return []
  if (content.type !== 'doc') return []

  const firstParagraph = content.content?.[0]
  if (!firstParagraph) return []
  if (firstParagraph.type !== 'paragraph') return []
  if (!firstParagraph.content) return []

  return firstParagraph.content
}

const attrsToJSONContent = (attrs: CodeFragmentWithIndex): JSONContent => {
  return { type: 'text', text: attrs.display, marks: [{ type: 'FormulaType', attrs }] }
}

export const content2definition = (content: JSONContent | undefined, formulaIsNormal: boolean): [string] => {
  const contents = content?.content?.[0]?.content ?? []
  const input = contents.map((c: JSONContent) => c.text ?? '').join('') ?? ''
  // console.log('contentArrayToInput', { content, input })
  return [formulaIsNormal ? `=${input}` : input]
}

export const definition2content = (definition: string, formulaIsNormal: boolean): [JSONContent | undefined, string] => {
  const newDefinition = maybeRemoveDefinitionEqual(definition, formulaIsNormal)
  if (!newDefinition) return [undefined, newDefinition]

  return [buildJSONContentByArray([{ type: 'text', text: newDefinition }]), newDefinition]
}

export const input2content = (
  { definition, position }: { position: number; definition: string },
  formulaIsNormal: boolean
): FormulaInput => {
  return {
    position: formulaIsNormal ? position - 1 : position,
    content: definition2content(definition, formulaIsNormal)[0]
  }
}

export const codeFragments2content = (
  codeFragments: CodeFragmentWithIndex[] | undefined,
  formulaIsNormal: boolean
): [JSONContent | undefined, CodeFragmentWithIndex[]] => {
  if (!codeFragments) return [undefined, []]
  const newCodeFragments = maybeRemoveCodeFragmentsEqual(codeFragments, formulaIsNormal)
  if (newCodeFragments.length === 0) return [undefined, []]

  const contents = newCodeFragments.map<JSONContent>(codeFragment => attrsToJSONContent(codeFragment))
  return [buildJSONContentByArray(contents), newCodeFragments]
}
