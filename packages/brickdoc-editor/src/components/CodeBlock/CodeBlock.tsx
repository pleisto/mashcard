import React from 'react'
import { NodeViewProps, NodeViewContent } from '@tiptap/react'
import { ActionDropdownMenuItem, ActionOptionGroup, ActionPanel } from '../ActionPanel/ActionPanel'
import { BlockWrapper } from '../../extensions/BlockWrapper'
import { Icon, Input, message, Modal } from '@brickdoc/design-system'
import { useEditorI18n } from '../..'
import 'highlight.js/styles/atom-one-light.css'
import './CodeBlock.less'

export interface CodeBlockProps extends NodeViewProps {}

const defaultLanguage = 'plain text'
const LANGUAGE_OPTION_LIMIT = 20

export const CodeBlock: React.FC<CodeBlockProps> = ({
  node: {
    attrs: { language = defaultLanguage },
    text
  },
  editor,
  updateAttributes,
  extension,
  deleteNode
}) => {
  const [t] = useEditorI18n()
  const [search, setSearch] = React.useState('')
  const menuItems: ActionDropdownMenuItem[] = React.useMemo(() => {
    const options = ([defaultLanguage, ...extension.options.lowlight.listLanguages()] as string[])
      .map<ActionDropdownMenuItem>(lang => ({
        type: 'item',
        name: lang,
        active: lang === language,
        onClick: closeMenu => {
          updateAttributes({
            language: lang
          })
          closeMenu()
        }
      }))
      .sort(i => (i.name === language ?? defaultLanguage ? -1 : 0))
      .filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, LANGUAGE_OPTION_LIMIT)

    return [
      {
        type: 'item',
        name: 'input',
        content: (
          <Input
            placeholder={t('code_block.search_placeholder')}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="brickdoc-code-block-lang-search-input"
          />
        )
      },
      ...options
    ]
  }, [extension.options.lowlight, language, search, t, updateAttributes])

  const handleDelete = React.useCallback((): void => {
    Modal.confirm({
      title: t('code_block.deletion_confirm.title'),
      okText: t('code_block.deletion_confirm.ok'),
      okButtonProps: {
        danger: true
      },
      cancelText: t('code_block.deletion_confirm.cancel'),
      icon: null,
      onOk: () => {
        deleteNode()
      }
    })
  }, [deleteNode, t])

  const actionOptions: ActionOptionGroup = [
    [
      {
        type: 'dropdown',
        dropdownType: 'popover',
        Icon: (
          <span>
            {language ?? defaultLanguage} <Icon.ArrowDown className="brickdoc-code-block-arrow-down" />
          </span>
        ),
        menuItems
      }
    ],
    [
      {
        type: 'button',
        Icon: <Icon.Copy />,
        onClick: async () => {
          await navigator.clipboard.writeText(text ?? '')
          void message.success(t('code_block.copy_hint'))
        }
      }
    ],
    [
      {
        type: 'dropdown',
        Icon: <Icon.More />,
        menuItems: [
          {
            type: 'item',
            Icon: <Icon.Delete />,
            name: t('action_panel.more.delete'),
            onClick: handleDelete
          }
        ]
      }
    ]
  ]

  return (
    <BlockWrapper editor={editor}>
      <ActionPanel options={actionOptions}>
        <pre>
          <NodeViewContent as="code" />
        </pre>
      </ActionPanel>
    </BlockWrapper>
  )
}
