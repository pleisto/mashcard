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
import { FormulaValue } from './FormulaValue'
import { FormulaInput } from './Render/FormulaInput'
import { FormulaButton } from './Render/FormulaButton'
import { FormulaLiteral } from './Render/FormulaLiteral'
import { FormulaSpreadsheet } from './Render/FormulaSpreadsheet'
import { BlockContainer } from '../BlockContainer'
import { SelectedType } from './useFormula'
import { useExternalProps } from '../../../hooks/useExternalProps'

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
        preview = (
          <BlockContainer>
            <FormulaSpreadsheet spreadsheet={newDisplayData.result.result as SpreadsheetType} />
          </BlockContainer>
        )
        break
      case 'Range':
        preview = (
          <BlockContainer>
            <FormulaSpreadsheet
              spreadsheet={(newDisplayData.result.result as any).spreadsheet}
              columnIds={(newDisplayData.result.result as RangeType).columnIds}
              rowIds={(newDisplayData.result.result as RangeType).rowIds}
              clip={true}
            />
          </BlockContainer>
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
