import { FC } from 'react'
import { NodeViewContent } from '@tiptap/react'
import { BlockContainer } from '../BlockContainer'
import { highlightStyle } from './styles/highlight.style'
import { CodeBlockViewProps } from '../../../extensions/blocks/codeBlock/meta'
import { useOptions } from './useOptions'

const defaultLanguage = 'plain text'

export const CodeBlockView: FC<CodeBlockViewProps> = ({ node, updateAttributes, deleteNode, getPos }) => {
  const {
    attrs: { language = defaultLanguage }
  } = node
  const [actionOptions] = useOptions(defaultLanguage, language, updateAttributes, node)

  return (
    <BlockContainer
      node={node}
      className={highlightStyle()}
      getPos={getPos}
      deleteNode={deleteNode}
      actionOptions={actionOptions}
    >
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </BlockContainer>
  )
}
