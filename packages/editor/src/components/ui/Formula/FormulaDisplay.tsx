import React from 'react'
import { Icon } from '@mashcard/design-system'
import { FormulaSourceType, VariableDisplayData } from '@mashcard/formula'
import { SelectedType } from '../../blockViews/FormulaView/useFormula'
import { FormulaLiteral, FormulaValue } from '.'
import * as Root from './Formula.style'
import { useEditorContext } from '../../../hooks'
import { getFormulaContext } from '../../blockViews/FormulaView'

export interface FormulaDisplayProps {
  displayData?: VariableDisplayData
  formulaType: FormulaSourceType
  name?: string
  disablePopover?: boolean
  selected?: SelectedType
}

export const FormulaDisplay: React.FC<FormulaDisplayProps> = ({
  displayData,
  formulaType,
  name,
  selected,
  disablePopover,
  ...props
}) => {
  const { editor } = useEditorContext()
  const formulaContext = getFormulaContext(editor)

  if (!displayData) {
    if (formulaType === 'normal') {
      return (
        <span {...props} className={Root.MashcardFormulaEmpty}>
          <Icon.Formula className="mashcard-formula-empty-icon" />
        </span>
      )
    }
    return <div />
  }

  const { result: result, type } = displayData

  if (result.type === 'literal') {
    return (
      <span {...props}>
        <FormulaLiteral result={result} formulaType={type} />
      </span>
    )
  }

  let preview: React.ReactElement | null = null

  if (result.view) {
    const viewRender = formulaContext!.findViewRender(result.view.type)
    if (viewRender) {
      preview = viewRender(result.view.attrs, displayData)
    }
  }

  return (
    <span {...props}>
      <FormulaValue
        displayData={displayData}
        name={name}
        selected={selected}
        disablePopover={disablePopover}
        border={true}
      />
      {preview ?? <></>}
    </span>
  )
}
