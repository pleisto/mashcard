/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { Icon, cx } from '@brickdoc/design-system'
import { Completion, CompletionKind } from '@brickdoc/formula'
import '../../../blockViews/Spreadsheet/Spreadsheet.less'
import './AutocompleteList.less'
import { CompletionType } from '../../../blockViews/FormulaView'
import { BlockPreview, ColumnPreview, SpreadsheetPreview, FunctionPreview, VariablePreview } from '../Preview'
import { BrickdocEventBus, FormulaKeyboardEventTrigger } from '@brickdoc/schema'
export interface AutocompleteListProps {
  rootId: string
  formulaId: string
  completion: CompletionType
}

const ICON_META: { [key in CompletionKind]: React.ReactElement } = {
  block: <Icon.Function />,
  column: <Icon.Column />,
  spreadsheet: <Icon.Table />,
  function: <Icon.Function />,
  variable: <Icon.Formula />
}

export const AutocompleteList: React.FC<AutocompleteListProps> = ({ rootId, formulaId, completion }) => {
  if (completion.kind === 'Completion') {
    if (!completion.completions.length) return null
    if (['=', ''].includes(completion.input.trim())) return null
    if (completion.formulaType === 'spreadsheet' && !completion.input.startsWith('=')) return null
  }

  let preview = <></>

  switch (completion.activeCompletion?.kind) {
    case 'block':
      preview = <BlockPreview block={completion.activeCompletion.preview} rootId={rootId} />
      break
    case 'column':
      preview = <ColumnPreview column={completion.activeCompletion.preview} rootId={rootId} />
      break
    case 'spreadsheet':
      preview = <SpreadsheetPreview spreadsheet={completion.activeCompletion.preview} rootId={rootId} />
      break
    case 'function':
      preview = <FunctionPreview functionClause={completion.activeCompletion.preview} rootId={rootId} />
      break
    case 'variable':
      preview = <VariablePreview variable={completion.activeCompletion.preview} rootId={rootId} />
      break
  }

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = event => {
    BrickdocEventBus.dispatch(
      FormulaKeyboardEventTrigger({ key: event.key, formulaId, rootId, isEditor: false, completionIndex: -1 })
    )
  }

  const handleOnClick = (index: number): void => {
    BrickdocEventBus.dispatch(
      FormulaKeyboardEventTrigger({ key: 'Click', formulaId, rootId, isEditor: false, completionIndex: index })
    )
  }

  return (
    <div className="formula-autocomplete">
      {completion.kind === 'Completion' && (
        <div className="formula-autocomplete-list">
          {completion.completions.map((c: Completion, index) => {
            const icon = ICON_META[c.kind]
            return (
              <div
                role="button"
                tabIndex={-1}
                onClick={() => handleOnClick(index)}
                key={index}
                onKeyDown={onKeyDown}
                className={cx('autocomplete-list-item', { active: index === completion.activeCompletionIndex })}>
                {React.cloneElement(icon, { className: 'autocomplete-list-item-icon' })}
                <div className="autocomplete-list-item-content">
                  <span className="autocomplete-list-item-name">{c.name}</span>
                  <span className="autocomplete-list-item-desc">{c.kind}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
      <div className="formula-autocomplete-preview">{preview}</div>
    </div>
  )
}
