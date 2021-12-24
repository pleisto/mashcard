import React from 'react'
import { NodeViewProps, NodeViewContent } from '@tiptap/react'
import { BlockContainer } from '../../components'
import { Icon, Input, message } from '@brickdoc/design-system'
import 'highlight.js/styles/atom-one-light.css'
import './CodeBlock.less'
import { ActionItemOption } from '../BlockActions'
import { BlockContainerProps } from '../BlockContainer'
import { EditorContext } from '../../context/EditorContext'

export interface CodeBlockProps extends NodeViewProps {}

const defaultLanguage = 'plain text'

const LIMIT = 10

export const CodeBlock: React.FC<CodeBlockProps> = ({ node, updateAttributes, extension, deleteNode }) => {
  const {
    attrs: { language = defaultLanguage }
  } = node
  const { t } = React.useContext(EditorContext)
  const [search, setSearch] = React.useState<string | undefined>('')
  const items: ActionItemOption[] = React.useMemo(
    () =>
      ([defaultLanguage, ...extension.options.lowlight.listLanguages()] as string[])
        .filter(lang => lang.toLowerCase().includes(search?.toLowerCase() ?? ''))
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
    [extension.options.lowlight, language, search, updateAttributes]
  )

  const actionOptions: BlockContainerProps['actionOptions'] = [
    {
      type: 'section',
      items: [
        {
          type: 'dropdown',
          name: 'languages',
          label: language ?? defaultLanguage,
          items: [
            {
              type: 'item',
              name: 'search',
              content: (
                <Input
                  placeholder={t('code_block.search_placeholder')}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              )
            },
            ...items.slice(0, LIMIT)
          ]
        }
      ]
    },
    {
      type: 'section',
      items: [
        {
          type: 'item',
          name: 'copy',
          icon: <Icon.Copy />,
          onAction: async () => {
            await navigator.clipboard.writeText(node.text ?? node.textContent ?? '')
            void message.success(t('copy_hint'))
          }
        }
      ]
    },
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
