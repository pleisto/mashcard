import { FC, useState } from 'react'
import { LineDown, Check } from '@mashcard/design-icons'
import { Menu, Input, Popover, Switch, styled, theme, cx } from '@mashcard/design-system'
import { BlockContainer } from '../BlockContainer'
import {
  highlightStyle,
  ViewModeBar,
  CodeContainer,
  CodeScroll,
  SwitchContainer,
  placeholderStyle
} from './styles/highlight.style'
import { CodeBlockViewProps } from '../../../extensions/blocks/codeBlock/meta'
import { CodeBlockAttributes } from '../../../extensions'
import { languageNames } from '../../../extensions/blocks/codeBlock/refractorLanguagesBundle'
import { useEditorI18n } from '../../../hooks'
import { BlockActionOptions } from '../BlockActions'
import { useNodeContent } from '@mashcard/editor'

const LanguageChecked = styled(Check, {
  fontSize: '1rem',
  color: theme.colors.primaryDefault
})
const defaultLanguage = 'plain text'

interface ILanguageSelect {
  language: string | null
  updateAttributes: (attributes: Partial<CodeBlockAttributes>) => void
}

const LanguageSelect: FC<ILanguageSelect> = (props: ILanguageSelect) => {
  const [t] = useEditorI18n()
  const { language, updateAttributes } = props

  const onAction = (key: string): void => {
    if (key === 'search') {
      return
    }
    updateAttributes({
      language: key
    })
    setVisible(false)
  }
  const [search, setSearch] = useState<string | undefined>('')
  const [visible, setVisible] = useState(false)
  const handleVisibleChange = (visible: boolean): void => setVisible(visible)
  const menu = (
    <>
      <div style={{ width: 244, padding: '8px 16px' }}>
        <Input
          placeholder={t('code_block.search_placeholder')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          size="sm"
        />
      </div>
      <Menu type="ghost" style={{ maxHeight: 400, overflow: 'auto' }}>
        {([defaultLanguage, ...languageNames] as string[])
          .filter(lang => lang.toLowerCase().includes(search?.toLowerCase() ?? ''))
          .map(name => (
            <Menu.Item
              key={name}
              itemKey={name}
              onAction={onAction}
              label={t(`code_block.languages.${name}`)}
              tip={name === language ? <LanguageChecked /> : undefined}
            />
          ))}
      </Menu>
    </>
  )
  const updateVisible = (): void => setVisible(state => !state)
  return (
    <Popover
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      placement="bottomStart"
      compact={true}
      getPopupContainer={element => element}
      content={menu}
      destroyTooltipOnHide={true}>
      <div role="tab" tabIndex={0} onClick={updateVisible} onKeyDown={updateVisible}>
        {t(`code_block.languages.${language}`)} <LineDown />
      </div>
    </Popover>
  )
}

export const CodeBlockView: FC<CodeBlockViewProps> = ({ node, updateAttributes, deleteNode, getPos }) => {
  const {
    attrs: { language, autoWrap: _autoWrap }
  } = node
  const autoWrap = _autoWrap !== false
  const onAutoWrapChange = (): void => {
    updateAttributes({
      autoWrap: !autoWrap
    })
  }
  const actionOptions: BlockActionOptions = ['cut', 'copy', 'delete']

  const [t] = useEditorI18n()
  const isEmpty = node.textContent.length === 0
  const placeholder = isEmpty ? t(`placeholder.code_block`) : ''
  const nodeContentRef = useNodeContent()

  return (
    <BlockContainer
      editable="custom"
      node={node}
      className={cx(highlightStyle(), placeholderStyle())}
      getPos={getPos}
      deleteNode={deleteNode}
      actionOptions={actionOptions}>
      <CodeContainer>
        <ViewModeBar>
          <LanguageSelect language={language ?? defaultLanguage} updateAttributes={updateAttributes} />
          <SwitchContainer>
            <span className="label">Auto Wrap</span>
            <Switch checked={!!autoWrap} size="sm" onChange={onAutoWrapChange} />
          </SwitchContainer>
        </ViewModeBar>
        <pre
          className={`line-numbers language-${language ?? defaultLanguage}`}
          spellCheck={false}
          data-placeholder={placeholder}>
          <code
            ref={nodeContentRef}
            className={`${autoWrap ? undefined : CodeScroll()} language-${language ?? defaultLanguage}`}
          />
        </pre>
      </CodeContainer>
    </BlockContainer>
  )
}
