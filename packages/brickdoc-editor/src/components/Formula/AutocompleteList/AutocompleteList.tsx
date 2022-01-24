/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import cx from 'classnames'
import { Icon } from '@brickdoc/design-system'
import {
  BlockCompletion,
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
import { CompletionType } from '../useFormula'
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
    Icon: <Icon.Table />,
    render: (completion: Completion, blockId: string) => {
      const { preview: block } = completion as BlockCompletion

      return <span>Block: {block.name()}</span>
    }
  },
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
                    editorContent={{ content: codeFragmentsToJSONContentTotal(example.codeFragments), position: 0 }}
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
              <FormulaEditor editorContent={{ content, position: 0 }} editable={false} />
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
  blockId,
  completion,
  setCompletion,
  handleSelectActiveCompletion
}) => {
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

  if (!completion.completions.length) {
    return <></>
  }

  return (
    <div className="formula-autocomplete">
      <div className="formula-autocomplete-list">
        {completion.completions.map((c, index) => {
          const styleMeta = COMPLETION_STYLE_META[c.kind]
          return (
            <div
              role="button"
              tabIndex={-1}
              onClick={() => {
                setCompletion(com => ({ ...com, activeCompletion: c, activeCompletionIndex: index }))
              }}
              key={c.value}
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
      <div className="formula-autocomplete-preview">{preview}</div>
    </div>
  )
}
