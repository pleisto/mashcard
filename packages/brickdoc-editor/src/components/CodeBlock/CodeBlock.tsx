import React from 'react'
import { NodeViewProps, NodeViewContent } from '@tiptap/react'
import { BlockContainer } from '../../components'
import { DeprecatedInput, Icon, styled, toast } from '@brickdoc/design-system'
import { highlightStyle } from './styles/highlight.style'
import { languageNames } from '../../extensions/codeBlockRefractor/refractorLanguagesBundle'
import * as EditorIcon from '../Icon'
import { ActionItemOption } from '../BlockActions'
import { BlockContainerProps } from '../BlockContainer'
import { EditorContext } from '../../context/EditorContext'
import { actionIconStyle } from '../BlockActions/BlockActionsMenu'

export interface CodeBlockProps extends NodeViewProps {}

const defaultLanguage = 'plain text'

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
      ([defaultLanguage, ...languageNames] as string[])
        .filter(lang => lang.toLowerCase().includes(search?.toLowerCase() ?? ''))
        .map<ActionItemOption>(lang => ({
          type: 'item',
          name: lang,
          label: t(`code_block.languages.${lang}`),
          tip: lang === language ? <LanguageChecked /> : undefined,
          onAction: () => {
            updateAttributes({
              language: lang
            })
          },
          closeOnAction: true
        }))
        .sort(i => (i.name === language ?? defaultLanguage ? -1 : 0)),
    [language, search, t, updateAttributes]
  )

  const actionOptions: BlockContainerProps['actionOptions'] = [
    {
      type: 'group',
      items: [
        {
          type: 'subMenu',
          name: 'languages',
          label: t(`code_block.languages.${language ?? defaultLanguage}`),
          icon: <EditorIcon.TextMessage className={actionIconStyle()} />,
          items: [
            {
              type: 'item',
              name: 'search',
              content: (
                <DeprecatedInput
                  placeholder={t('code_block.search_placeholder')}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              ),
              closeOnAction: false
            },
            ...items
          ]
        }
      ]
    },
    {
      type: 'item',
      name: 'copy',
      label: t('code_block.copy_code'),
      icon: <EditorIcon.Copy className={actionIconStyle()} />,
      onAction: async () => {
        await navigator.clipboard.writeText(node.text ?? node.textContent ?? '')
        void toast.success(t('copy_hint'))
      },
      closeOnAction: true
    },
    'delete'
  ]

  return (
    <BlockContainer className={highlightStyle()} getPos={getPos} deleteNode={deleteNode} actionOptions={actionOptions}>
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </BlockContainer>
  )
}
