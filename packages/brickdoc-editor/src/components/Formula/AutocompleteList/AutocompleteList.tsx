/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { Icon, cx } from '@brickdoc/design-system'
import { Completion, CompletionKind } from '@brickdoc/formula'
import '../../Spreadsheet/Spreadsheet.less'
import './AutocompleteList.less'
import { CompletionType } from '../useFormula'
import { BlockPreview } from '../Preview/BlockPreview'
import { ColumnPreview } from '../Preview/ColumnPreview'
import { SpreadsheetPreview } from '../Preview/SpreadsheetPreview'
import { FunctionPreview } from '../Preview/FunctionPreview'
import { VariablePreview } from '../Preview/VariablePreview'
export interface AutocompleteListProps {
  blockId: string
  handleSelectActiveCompletion: () => void
  completion: CompletionType
  setCompletion: React.Dispatch<React.SetStateAction<CompletionType>>
}

const ICON_META: { [key in CompletionKind]: React.ReactElement } = {
  block: <Icon.Function />,
  column: <Icon.Column />,
  spreadsheet: <Icon.Table />,
  function: <Icon.Function />,
  variable: <Icon.Formula />
}

export const AutocompleteList: React.FC<AutocompleteListProps> = ({
  blockId,
  completion,
  setCompletion,
  handleSelectActiveCompletion
}) => {
  if (completion.kind === 'Completion' && !completion.completions.length) {
    return <></>
  }

  let preview = <></>

  switch (completion.activeCompletion?.kind) {
    case 'block':
      preview = <BlockPreview block={completion.activeCompletion.preview} blockId={blockId} />
      break
    case 'column':
      preview = <ColumnPreview column={completion.activeCompletion.preview} blockId={blockId} />
      break
    case 'spreadsheet':
      preview = <SpreadsheetPreview spreadsheet={completion.activeCompletion.preview} blockId={blockId} />
      break
    case 'function':
      preview = <FunctionPreview functionClause={completion.activeCompletion.preview} blockId={blockId} />
      break
    case 'variable':
      preview = <VariablePreview variable={completion.activeCompletion.preview} blockId={blockId} />
      break
  }

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = event => {
    let newIndex: number

    switch (event.key) {
      case 'Tab':
        handleSelectActiveCompletion()
        break
      case 'Enter':
        handleSelectActiveCompletion()
        break
      case 'ArrowDown':
        newIndex =
          completion.activeCompletionIndex + 1 > completion.completions.length - 1
            ? 0
            : completion.activeCompletionIndex + 1
        setCompletion(c => ({ ...c, activeCompletionIndex: newIndex, activeCompletion: c.completions[newIndex] }))
        break
      case 'ArrowUp':
        newIndex =
          completion.activeCompletionIndex - 1 < 0
            ? completion.completions.length - 1
            : completion.activeCompletionIndex - 1
        setCompletion(c => ({ ...c, activeCompletionIndex: newIndex, activeCompletion: c.completions[newIndex] }))
        break
    }
  }

  const handleOnClick = (c: Completion, index: number): void => {
    if (index === completion.activeCompletionIndex) {
      handleSelectActiveCompletion()
    } else {
      setCompletion(com => ({ ...com, activeCompletion: c, activeCompletionIndex: index }))
    }
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
                onClick={() => handleOnClick(c, index)}
                key={index}
                onKeyDown={onKeyDown}
                className={cx('autocomplete-list-item', {
                  active: c.value === completion.activeCompletion?.value
                })}>
                {React.cloneElement(icon, { className: 'autocomplete-list-item-icon' })}
                <div className="autocomplete-list-item-content">
                  <span className="autocomplete-list-item-name">{c.name}</span>
                  <span className="autocomplete-list-item-desc">
                    {c.kind} {c.renderDescription(blockId)}
                  </span>
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
