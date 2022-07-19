/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { Icon, cx } from '@mashcard/design-system'
import { Completion, CompletionKind } from '@mashcard/formula'
import { FormulaAutocomplete } from './style'
import { CompletionType } from '../../../blockViews/FormulaView'
import { BlockPreview, ColumnPreview, SpreadsheetPreview, FunctionPreview, VariablePreview } from '../Preview'
import { MashcardEventBus, FormulaKeyboardEventTrigger } from '@mashcard/schema'
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

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = async event => {
    const key = event.key
    if (key !== 'Enter' && key !== 'Tab' && key !== 'ArrowUp' && key !== 'ArrowDown' && key !== 'Escape') return
    const result = MashcardEventBus.dispatch(
      FormulaKeyboardEventTrigger({
        event: { ...event, key },
        formulaId,
        rootId,
        type: 'autoComplete',
        completionIndex: -1
      })
    )
    await Promise.all(result)
  }

  const handleOnClick = async (index: number): Promise<void> => {
    const result = MashcardEventBus.dispatch(
      FormulaKeyboardEventTrigger({ event: null, formulaId, rootId, type: 'autoComplete', completionIndex: index })
    )
    await Promise.all(result)
  }

  return (
    <FormulaAutocomplete>
      {completion.kind === 'Completion' && (
        <div className="formula-autocomplete-list">
          {completion.completions.map((c: Completion, index) => {
            const icon = ICON_META[c.kind]
            return (
              <div
                role="button"
                tabIndex={-1}
                onClick={async () => await handleOnClick(index)}
                key={index}
                onKeyDown={onKeyDown}
                className={cx('autocomplete-list-item', { active: index === completion.activeCompletionIndex })}
              >
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
    </FormulaAutocomplete>
  )
}
