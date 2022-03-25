import { useState, useMemo } from 'react'
import { TextMessage, Copy, Check } from '@brickdoc/design-icons'
import { Input, styled, toast } from '@brickdoc/design-system'
import { languageNames } from '../../../extensions/blocks/codeBlock/refractorLanguagesBundle'
import { ActionItemOption, BlockActionOptions } from '../BlockActions'
import { actionIconStyle } from '../BlockActions/BlockActionsMenu'
import { CodeBlockViewProps } from '../../../extensions/blocks/codeBlock/meta'
import { useEditorContext } from '../../../hooks'

const LanguageChecked = styled(Check, {
  fontSize: '1rem'
})

export function useOptions(
  defaultLanguage: string,
  language: string | null,
  updateAttributes: CodeBlockViewProps['updateAttributes'],
  node: CodeBlockViewProps['node']
): [BlockActionOptions] {
  const { t } = useEditorContext()
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
    [defaultLanguage, language, search, t, updateAttributes]
  )

  const actionOptions: BlockActionOptions = [
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

  return [actionOptions]
}
