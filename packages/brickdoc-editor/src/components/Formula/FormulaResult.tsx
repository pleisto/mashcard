import React from 'react'
import { Completion, displayValue, ErrorMessage, VariableInterface } from '@brickdoc/formula'
import './FormulaMenu.less'
import { AutocompleteList } from './AutocompleteList/AutocompleteList'

export interface FormulaResultProps {
  error: ErrorMessage | undefined
  completions: Completion[]
  handleSelectActiveCompletion: () => void
  setActiveCompletion: (completion: Completion) => void
  activeCompletionIndex: number
  setActiveCompletionIndex: (index: number) => void
  activeCompletion: Completion | undefined
  rootId: string
  variable: VariableInterface | undefined
}

export const FormulaResult: React.FC<FormulaResultProps> = ({
  error,
  variable,
  rootId,
  completions,
  activeCompletionIndex,
  handleSelectActiveCompletion,
  setActiveCompletionIndex,
  activeCompletion,
  setActiveCompletion
}) => {
  return (
    <>
      <div className="formula-menu-result">
        {error && (
          <span className="formula-menu-result-error">
            <span className="formula-menu-result-error-type">{error.type}</span>
            <span className="formula-menu-result-error-message">{error.message}</span>
          </span>
        )}
        {!error && variable && displayValue(variable.t.variableValue.result)}
      </div>
      <div className="formula-menu-divider" />
      <AutocompleteList
        blockId={rootId}
        completions={completions}
        handleSelectActiveCompletion={handleSelectActiveCompletion}
        setActiveCompletion={setActiveCompletion}
        activeCompletionIndex={activeCompletionIndex}
        setActiveCompletionIndex={setActiveCompletionIndex}
        activeCompletion={activeCompletion}
      />
    </>
  )
}
