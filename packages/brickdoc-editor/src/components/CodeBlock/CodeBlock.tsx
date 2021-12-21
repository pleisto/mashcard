import React from 'react'
import { NodeViewProps, NodeViewContent } from '@tiptap/react'
import { BlockContainer } from '../../components'
import { Icon, message } from '@brickdoc/design-system'
import 'highlight.js/styles/atom-one-light.css'
import './CodeBlock.less'
import { ActionItemOption } from '../BlockActions'
import { BlockContainerProps } from '../BlockContainer'
import { EditorContext } from '../../context/EditorContext'

export interface CodeBlockProps extends NodeViewProps {}

const defaultLanguage = 'plain text'

export const CodeBlock: React.FC<CodeBlockProps> = ({ node, updateAttributes, extension, deleteNode }) => {
  const {
    attrs: { language = defaultLanguage }
  } = node
  const { t } = React.useContext(EditorContext)
  const menuItems: ActionItemOption[] = React.useMemo(
    () =>
      ([defaultLanguage, ...extension.options.lowlight.listLanguages()] as string[])
        .map<ActionItemOption>(lang => ({
          type: 'item',
          name: lang,
          active: lang === language,
          onAction: () => {
            updateAttributes({
              language: lang
            })
          },
          closeOnAction: true
        }))
        .sort(i => (i.name === language ?? defaultLanguage ? -1 : 0)),
    [extension.options.lowlight, language, updateAttributes]
  )

  const actionOptions: BlockContainerProps['actionOptions'] = [
    [
      {
        type: 'dropdown',
        name: 'languages',
        content: language ?? defaultLanguage,
        searchable: true,
        menuItems
      }
    ],
    [
      {
        type: 'item',
        name: 'copy',
        icon: <Icon.Copy />,
        onAction: async () => {
          await navigator.clipboard.writeText(node.text ?? node.textContent ?? '')
          void message.success(t('copy_hint'))
        }
      }
    ],
    'delete'
  ]

  return (
    <BlockContainer deleteNode={deleteNode} actionOptions={actionOptions}>
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </BlockContainer>
  )
}
