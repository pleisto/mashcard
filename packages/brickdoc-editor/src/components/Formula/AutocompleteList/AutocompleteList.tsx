/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { Icon, cx } from '@brickdoc/design-system'
import {
  BlockCompletion,
  ColumnType,
  Completion,
  CompletionKind,
  displayValue,
  dumpDisplayResult,
  FunctionCompletion,
  SpreadsheetCompletion,
  VariableCompletion
} from '@brickdoc/formula'
import '../../Spreadsheet/Spreadsheet.less'
import './AutocompleteList.less'
import { FormulaEditor } from '../../../extensions/formula/FormulaEditor/FormulaEditor'
import { codeFragmentsToJSONContentTotal } from '../../../helpers/formula'
import { CompletionType } from '../useFormula'
import { FormulaValue } from '../FormulaValue'
import { FormulaSpreadsheet } from '../Render/FormulaSpreadsheet'
export interface AutocompleteListProps {
  blockId: string
  handleSelectActiveCompletion: () => void
  completion: CompletionType
  setCompletion: React.Dispatch<React.SetStateAction<CompletionType>>
}

const COMPLETION_STYLE_META: {
  [key in CompletionKind]: {
    Icon: React.ReactElement
    render: (completion: Completion, blockId: string) => React.ReactElement
  }
} = {
  block: {
    Icon: <Icon.Function />,
    render: (completion: Completion, blockId: string) => {
      const { preview: block } = completion as BlockCompletion

      return (
        <div className="autocomplete-preview-block">
          <div className="autocomplete-preview-block-name">{block.name(blockId)}</div>
        </div>
      )
    }
  },
  column: {
    Icon: <Icon.Column />,
    render: (completion: Completion, blockId: string) => {
      const column = completion.preview as ColumnType

      return (
        <div className="brickdoc">
          <div className="ProseMirror">
            <div className="autocomplete-preview-column">
              <FormulaSpreadsheet spreadsheet={column.spreadsheet} columnIds={[column.columnId]} />
            </div>
          </div>
        </div>
      )
    }
  },
  spreadsheet: {
    Icon: <Icon.Table />,
    render: (completion: Completion, blockId: string) => {
      const { preview } = completion as SpreadsheetCompletion

      return (
        <div className="brickdoc">
          <div className="ProseMirror">
            <div className="autocomplete-preview-spreadsheet">
              <FormulaSpreadsheet spreadsheet={preview} />
            </div>
          </div>
        </div>
      )
    }
  },
  function: {
    Icon: <Icon.Function />,
    render: (completion: Completion, blockId: string): React.ReactElement => {
      const { preview } = completion as FunctionCompletion
      return (
        <div className="formula-autocomplete-preview-function">
          <div className="autocomplete-preview-name">
            {preview.name} (
            {preview.args.map((arg, index) => (
              <span className="autocomplete-preview-arg" key={arg.name}>
                {arg.name}
                {index !== preview.args.length - 1 && <span className="autocomplete-preview-arg-separator"> , </span>}
              </span>
            ))}
            )
          </div>
          <div className="autocomplete-preview-desc">{preview.description}</div>
          <div className="autocomplete-preview-section">
            <div className="autocomplete-preview-section-head">Inputs</div>
            {preview.args.length > 0
              ? preview.args.map(arg => (
                  <div key={arg.name} className="autocomplete-preview-inputs-arg">
                    <span className="autocomplete-preview-input-tag">{arg.name}</span> : {arg.type}
                  </div>
                ))
              : 'None.'}
          </div>
          <div className="autocomplete-preview-section">
            <div className="autocomplete-preview-section-head">Outputs</div>
            {preview.returns ? <span className="autocomplete-preview-output-tag">{preview.returns}</span> : 'None.'}
          </div>
          {preview.examples.length > 0 && (
            <div className="autocomplete-preview-section">
              <div className="autocomplete-preview-section-head">Example</div>
              {preview.examples.map((example, index) => (
                <div key={index} className="autocomplete-preview-example">
                  <FormulaEditor
                    editorContent={{
                      content: codeFragmentsToJSONContentTotal(example.codeFragments),
                      input: '',
                      position: 0
                    }}
                    editable={false}
                  />
                  <br />
                  <span className="autocomplete-preview-example-result">
                    ={JSON.stringify(example?.output?.result)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }
  },
  variable: {
    Icon: <Icon.Formula />,
    render: (completion: Completion, blockId: string): React.ReactElement => {
      const { preview } = completion as VariableCompletion
      const content = preview.t.valid
        ? codeFragmentsToJSONContentTotal(preview.t.codeFragments)
        : { type: 'doc', content: [{ type: 'text', text: preview.t.definition }] }
      return (
        <div className="formula-autocomplete-preview-variable">
          <div className="autocomplete-preview-name">{preview.t.name}</div>
          <div className="autocomplete-preview-section">
            <div className="autocomplete-preview-section-head">Definition</div>
            <div className="autocomplete-preview-definition">
              <FormulaEditor editorContent={{ content, input: '', position: 0 }} editable={false} />
            </div>
          </div>
          <div className="autocomplete-preview-section">
            <div className="autocomplete-preview-section-head">Type</div>
            <span className="autocomplete-preview-input-tag">{preview.t.variableValue.result.type}</span>
          </div>
          <div className="autocomplete-preview-section">
            <div className="autocomplete-preview-section-head">Value</div>
            <span className="autocomplete-preview-output-tag">
              <FormulaValue
                displayData={dumpDisplayResult(preview.t, true)}
                display={displayValue(preview.t.variableValue.result, blockId)}
              />
            </span>
          </div>
        </div>
      )
    }
  }
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

  const preview = completion.activeCompletion
    ? COMPLETION_STYLE_META[completion.activeCompletion.kind].render(completion.activeCompletion, blockId)
    : 'Empty!'

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
          {completion.completions.map((c, index) => {
            const styleMeta = COMPLETION_STYLE_META[c.kind]
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
                {React.cloneElement(styleMeta.Icon ?? <Icon.Formula />, { className: 'autocomplete-list-item-icon' })}
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
