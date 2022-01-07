/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import cx from 'classnames'
import { Icon } from '@brickdoc/design-system'
import {
  ColumnCompletion,
  Completion,
  CompletionKind,
  displayValue,
  FunctionCompletion,
  SpreadsheetCompletion,
  VariableCompletion
} from '@brickdoc/formula'
import './AutocompleteList.less'
import { FormulaEditor } from '../../../extensions/formula/FormulaEditor/FormulaEditor'
import { codeFragmentsToJSONContentTotal } from '../../../helpers/formula'
export interface AutocompleteListProps {
  completions: Completion[]
  blockId: string
  handleSelectActiveCompletion: () => void
  setActiveCompletion: React.Dispatch<React.SetStateAction<Completion | undefined>>
  setActiveCompletionIndex: React.Dispatch<React.SetStateAction<number>>
  activeCompletionIndex: number
  activeCompletion: Completion | undefined
}

const COMPLETION_STYLE_META: {
  [key in CompletionKind]: {
    Icon: React.ReactElement
    render: (completion: Completion, blockId: string) => React.ReactElement
  }
} = {
  column: {
    Icon: <Icon.Table />,
    render: (completion: Completion, blockId: string) => {
      const {
        preview: { rows, name }
      } = completion as ColumnCompletion
      const borderStyle = { border: '1px solid' }

      return (
        <table style={{ ...borderStyle, height: '100%' }}>
          <tbody>
            <tr>
              <th style={borderStyle}>{name}</th>
            </tr>
            {rows.map((o, idx) => (
              <tr key={idx}>
                <td style={borderStyle}>{o}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    }
  },
  spreadsheet: {
    Icon: <Icon.Table />,
    render: (completion: Completion, blockId: string) => {
      const { preview } = completion as SpreadsheetCompletion
      const [header, ...body] = preview.toArray()
      const borderStyle = { border: '1px solid' }

      return (
        <table style={{ ...borderStyle, width: '100%', height: '100%' }}>
          <tbody>
            <tr>
              {header.map((o, idx) => (
                <th style={borderStyle} key={idx}>
                  {o}
                </th>
              ))}
            </tr>
            {body.map((row, idx) => (
              <tr key={idx}>
                {row.map((o, rowIdx) => (
                  <td style={borderStyle} key={rowIdx}>
                    {o}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )
    }
  },
  function: {
    Icon: <Icon.Table />,
    render: (completion: Completion, blockId: string): React.ReactElement => {
      const { preview } = completion as FunctionCompletion
      return (
        <div className="formula-autocomplete-preview-function">
          <div className="autocomplete-preview-name">
            {preview.name} ({' '}
            {preview.args.map((arg, index) => (
              <span className="autocomplete-preview-arg" key={arg.name}>
                {arg.name}
                {index !== preview.args.length - 1 && <span className="autocomplete-preview-arg-separator"> , </span>}
              </span>
            ))}{' '}
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
                    content={codeFragmentsToJSONContentTotal(example.codeFragments, blockId)}
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
        ? codeFragmentsToJSONContentTotal(preview.t.codeFragments, blockId)
        : { type: 'doc', content: [{ type: 'text', text: preview.t.definition }] }
      return (
        <div className="formula-autocomplete-preview-variable">
          <div className="autocomplete-preview-name">{preview.t.name}</div>
          <div className="autocomplete-preview-section">
            <div className="autocomplete-preview-section-head">Definition</div>
            <div className="autocomplete-preview-definition">
              <FormulaEditor content={content} editable={false} />
            </div>
          </div>
          <div className="autocomplete-preview-section">
            <div className="autocomplete-preview-section-head">Type</div>
            <span className="autocomplete-preview-input-tag">{preview.t.variableValue.result.type}</span>
          </div>
          <div className="autocomplete-preview-section">
            <div className="autocomplete-preview-section-head">Value</div>
            <span className="autocomplete-preview-output-tag">{displayValue(preview.t.variableValue.result)}</span>
          </div>
        </div>
      )
    }
  }
}

export const AutocompleteList: React.FC<AutocompleteListProps> = ({
  completions,
  blockId,
  setActiveCompletion,
  setActiveCompletionIndex,
  activeCompletionIndex,
  activeCompletion,
  handleSelectActiveCompletion
}) => {
  const preview = activeCompletion
    ? COMPLETION_STYLE_META[activeCompletion.kind].render(activeCompletion, blockId)
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
        newIndex = activeCompletionIndex + 1 > completions.length - 1 ? 0 : activeCompletionIndex + 1
        setActiveCompletion(completions[newIndex])
        setActiveCompletionIndex(newIndex)
        break
      case 'ArrowUp':
        newIndex = activeCompletionIndex - 1 < 0 ? completions.length - 1 : activeCompletionIndex - 1
        setActiveCompletion(completions[newIndex])
        setActiveCompletionIndex(newIndex)
        break
    }
  }

  return (
    <div className="formula-autocomplete">
      <div className="formula-autocomplete-list">
        {completions.map((completion, index) => {
          const styleMeta = COMPLETION_STYLE_META[completion.kind]
          return (
            <div
              role="button"
              tabIndex={-1}
              onClick={() => {
                setActiveCompletion(completion)
                setActiveCompletionIndex(index)
              }}
              key={completion.value}
              onKeyDown={onKeyDown}
              className={cx('autocomplete-list-item', {
                active: completion.value === activeCompletion?.value
              })}>
              {React.cloneElement(styleMeta.Icon ?? <Icon.Formula />, { className: 'autocomplete-list-item-icon' })}
              <div className="autocomplete-list-item-content">
                <span className="autocomplete-list-item-name">{completion.name}</span>
                <span className="autocomplete-list-item-desc">
                  {completion.kind} {completion.renderDescription(blockId)}
                </span>
              </div>
            </div>
          )
        })}
      </div>
      <div className="formula-autocomplete-preview">{preview}</div>
    </div>
  )
}
