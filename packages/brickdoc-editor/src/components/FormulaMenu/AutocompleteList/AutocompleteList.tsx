/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import cx from 'classnames'
import { Icon } from '@brickdoc/design-system'
import { Completion, FunctionCompletion, VariableCompletion } from '@brickdoc/formula'
import './AutocompleteList.less'
import { FormulaEditor } from '../../../extensions/formula/FormulaEditor/FormulaEditor'
import { codeFragmentsToJSONContent } from '../../../helpers/formula'
export interface AutocompleteListProps {
  completions: Completion[]
  handleSelectActiveCompletion: () => void
  setActiveCompletion: React.Dispatch<React.SetStateAction<Completion | undefined>>
  setActiveCompletionIndex: React.Dispatch<React.SetStateAction<number>>
  activeCompletionIndex: number
  activeCompletion: Completion | undefined
}

const COMPLETION_STYLE_META: {
  [key: string]: {
    Icon: React.ReactElement
    descKey?: keyof Completion | string
    render: (completion: Completion) => React.ReactElement
  }
} = {
  function: {
    Icon: <Icon.Table />,
    descKey: 'namespace',
    render: (completion: Completion): React.ReactElement => {
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
                  {preview.name}({example.input.join(',')})
                  <br />
                  <span className="autocomplete-preview-example-result">={JSON.stringify(example.output)}</span>
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
    descKey: 'variable',
    render: (completion: Completion): React.ReactElement => {
      const { preview } = completion as VariableCompletion
      const content = codeFragmentsToJSONContent(preview.codeFragments)
      return (
        <div className="formula-autocomplete-preview-variable">
          <div className="autocomplete-preview-name">{preview.name}</div>
          <div className="autocomplete-preview-section">
            <div className="autocomplete-preview-section-head">Definition</div>
            <div className="autocomplete-preview-definition">
              <FormulaEditor content={content} editable={false} />
            </div>
          </div>
          <div className="autocomplete-preview-section">
            <div className="autocomplete-preview-section-head">Type</div>
            <span className="autocomplete-preview-input-tag">{preview.variableValue.type}</span>
          </div>
          <div className="autocomplete-preview-section">
            <div className="autocomplete-preview-section-head">Value</div>
            <span className="autocomplete-preview-output-tag">{preview.variableValue.value}</span>
          </div>
        </div>
      )
    }
  }
}

export const AutocompleteList: React.FC<AutocompleteListProps> = ({
  completions,
  setActiveCompletion,
  setActiveCompletionIndex,
  activeCompletionIndex,
  activeCompletion,
  handleSelectActiveCompletion
}) => {
  const preview = activeCompletion ? COMPLETION_STYLE_META[activeCompletion.kind].render(activeCompletion) : 'Empty!'

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
              className={cx('autocomplete-list-item', { active: completion.value === activeCompletion?.value })}>
              {React.cloneElement(styleMeta.Icon ?? <Icon.Formula />, { className: 'autocomplete-list-item-icon' })}
              <div className="autocomplete-list-item-content">
                <span className="autocomplete-list-item-name">{completion.name}</span>
                {styleMeta.descKey && (
                  <span className="autocomplete-list-item-desc">
                    {completion[styleMeta.descKey as keyof Completion] ?? styleMeta.descKey}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <div className="formula-autocomplete-preview">{preview}</div>
    </div>
  )
}
