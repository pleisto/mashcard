import React from 'react'
import { NodeViewProps, NodeViewContent } from '@tiptap/react'
import { BlockContainer } from '../../components'
import { Icon, Input, styled, toast } from '@brickdoc/design-system'
import 'highlight.js/styles/atom-one-light.css'
import './CodeBlock.less'
import { ActionItemOption } from '../BlockActions'
import { BlockContainerProps } from '../BlockContainer'
import { EditorContext } from '../../context/EditorContext'
import { ActionIcon } from '../BlockActions/BlockActionsMenu'

export interface CodeBlockProps extends NodeViewProps {}

const defaultLanguage = 'plain text'

const LIMIT = 10

const LanguageChecked = styled(Icon.Check, {
  fontSize: '1rem'
})

export const CodeBlock: React.FC<CodeBlockProps> = ({ node, updateAttributes, extension, deleteNode, getPos }) => {
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
          label: lang,
          tip: lang === language ? <LanguageChecked /> : undefined,
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
      type: 'group',
      items: [
        {
          type: 'subMenu',
          name: 'languages',
          label: language ?? defaultLanguage,
          icon: (
            <ActionIcon>
              <Icon.TextMessage />
            </ActionIcon>
          ),
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
              ),
              closeOnAction: false
            },
            ...items.slice(0, LIMIT)
          ]
        }
      ]
    },
    {
      type: 'item',
      name: 'copy',
      label: t('code_block.copy_code'),
      icon: (
        <ActionIcon>
          <Icon.Copy />
        </ActionIcon>
      ),
      onAction: async () => {
        await navigator.clipboard.writeText(node.text ?? node.textContent ?? '')
        void toast.success(t('copy_hint'))
      },
      closeOnAction: true
    },
    'delete'
  ]

  return (
    <BlockContainer getPos={getPos} deleteNode={deleteNode} actionOptions={actionOptions}>
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </BlockContainer>
  )
}
