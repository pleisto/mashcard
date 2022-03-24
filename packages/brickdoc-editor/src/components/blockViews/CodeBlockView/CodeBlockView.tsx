import { FC, useContext, useMemo, useState } from 'react'
import { NodeViewContent } from '@tiptap/react'
import { BlockContainer, BlockContainerProps } from '../BlockContainer'
import { Input, Icon, styled, toast } from '@brickdoc/design-system'
import { highlightStyle } from './styles/highlight.style'
import { languageNames } from '../../../extensions/blocks/codeBlock/refractorLanguagesBundle'
import { TextMessage, Copy } from '../../ui'
import { ActionItemOption } from '../BlockActions'
import { EditorContext } from '../../../context/EditorContext'
import { actionIconStyle } from '../BlockActions/BlockActionsMenu'
import { CodeBlockViewProps } from '../../../extensions/blocks/codeBlock/meta'

const defaultLanguage = 'plain text'

const LanguageChecked = styled(Icon.Check, {
  fontSize: '1rem'
})

export const CodeBlockView: FC<CodeBlockViewProps> = ({ node, updateAttributes, extension, deleteNode, getPos }) => {
  const {
    attrs: { language = defaultLanguage }
  } = node
  const { t } = useContext(EditorContext)
  const [search, setSearch] = useState<string | undefined>('')
  const items: ActionItemOption[] = useMemo(
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
          icon: <TextMessage className={actionIconStyle()} />,
          items: [
            {
              type: 'item',
              name: 'search',
              content: (
                <Input
                  bordered={false}
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
      icon: <Copy className={actionIconStyle()} />,
      onAction: async () => {
        await navigator.clipboard.writeText(node.text ?? node.textContent ?? '')
        void toast.success(t('copy_hint'))
      },
      closeOnAction: true
    },
    'delete'
  ]

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
