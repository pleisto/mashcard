import React from 'react'
import { Icon } from '@brickdoc/design-system'
import {
  ButtonResult,
  InputResult,
  SpreadsheetType,
  FormulaSourceType,
  VariableDisplayData,
  loadDisplayResult,
  RangeType
} from '@brickdoc/formula'
import { SelectedType } from '../../blockViews/FormulaView/useFormula'
import { useExternalProps } from '../../../hooks/useExternalProps'
import { FormulaButton, FormulaInput, FormulaLiteral, FormulaSpreadsheet, FormulaValue } from '.'

export interface FormulaDisplayProps {
  displayData?: VariableDisplayData
  display?: string
  formulaType: FormulaSourceType
  name?: string
  disablePopover?: boolean
  selected?: SelectedType
}

export const FormulaDisplay: React.FC<FormulaDisplayProps> = ({
  displayData,
  display,
  formulaType,
  name,
  selected,
  disablePopover,
  ...props
}) => {
  const externalProps = useExternalProps()
  if (!displayData) {
    if (formulaType === 'normal') {
      return (
        <span {...props} className="brickdoc-formula-empty">
          <Icon.Formula className="brickdoc-formula-empty-icon" />
        </span>
      )
    }
    return <div />
  }

  const { kind, result, type, meta } = displayData

  if (kind === 'literal') {
    return (
      <span {...props}>
        <FormulaLiteral result={result} formulaType={type} />
      </span>
    )
  }

  const formulaContext = externalProps.formulaContext!

  const ctx = { formulaContext, meta, interpretContext: { ctx: {}, arguments: [] } }
  const newDisplayData = loadDisplayResult(ctx, displayData)

  let preview: React.ReactElement | null = null

  const dataResult = newDisplayData.result

  if (dataResult.view) {
    const viewRender = formulaContext.findViewRender(dataResult.view.type)
    if (viewRender) {
      preview = viewRender(dataResult.view.attrs, newDisplayData)
    }
  }

  if (!preview) {
    switch (dataResult.type) {
      case 'Button':
        preview = <FormulaButton result={newDisplayData.result as ButtonResult} formulaType={newDisplayData.type} />
        break
      case 'Input':
        preview = <FormulaInput result={newDisplayData.result as InputResult} formulaType={newDisplayData.type} />
        break
      case 'Spreadsheet':
        preview = <FormulaSpreadsheet spreadsheet={newDisplayData.result.result as SpreadsheetType} />
        break
      case 'Range':
        preview = (
          <FormulaSpreadsheet
            spreadsheet={(newDisplayData.result.result as any).spreadsheet}
            columnIds={(newDisplayData.result.result as RangeType).columnIds}
            rowIds={(newDisplayData.result.result as RangeType).rowIds}
            clip={true}
          />
        )
        break
      default:
        break
    }
  }

  return (
    <span {...props}>
      <FormulaValue
        displayData={newDisplayData}
        name={name}
        selected={selected}
        disablePopover={disablePopover}
        display={display ?? newDisplayData.display}
        border={true}
      />
      {preview ?? <></>}
    </span>
  )
}
